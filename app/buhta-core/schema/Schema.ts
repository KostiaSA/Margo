import * as _ from "lodash";
import {ISchemaObject, IPersistentObject, PersistentObject, SchemaObject} from "./SchemaObject";
import {MongoClient, Db, UpdateWriteOpResult, Collection} from "mongodb";
import {sleep} from "../utils/sleep";
import {getInstantPromise} from "../utils/getInstantPromise";
import {objectClasses} from "../objectClasses";
import {getRandomString} from "../utils/getRandomString";
import {getInstantPromiseError} from "../utils/getInstantPromiseError";


let defaultSchema: Schema;

export function getSchema(): Schema {
    if (!defaultSchema) {
        //defaultSchema = new Schema("mongodb://green/mik");
        defaultSchema = new Schema("mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo");

    }
    return defaultSchema;
}

export class Schema {
    constructor(public mongoConnectionString: string) {

    }

    private objects_cache: { [key: string]: ISchemaObject; } = {};
    private objects_cache_is_loading: { [key: string]: boolean; } = {};

    private mongoDb: Db;
    private mongoDbConnecting: boolean;

    async getMongoDb(): Promise<Db> {
        if (this.mongoDb !== undefined) {
            return getInstantPromise<Db>(this.mongoDb);
        }
        else if (this.mongoDbConnecting) {
            // если уже послан запрос на коннект, то просто ждем 200мс и запрашиваем снова
            await sleep(200);
            return this.getMongoDb();
        }
        else {
            this.mongoDb = await MongoClient.connect(this.mongoConnectionString);
            this.mongoDbConnecting = false;
            console.log("Mongo connection established to", this.mongoConnectionString);
            return this.getMongoDb();
        }
    }

    resetObjectCache(id: string) {
        delete this.objects_cache[id];
    }

//     let objs = await (await getSchema().getSchemaObjectCollection())
// .find({},
//     {
//         parentObjectId: 1,
//         name: 1
//     })
// .toArray();

    async getObjectName(id: string): Promise<string> {
        let coll = await this.getSchemaObjectCollection();
        let objs = await coll.find(
            {_id: id},
            {name: 1})
            .toArray();

        if (!objs[0])
            return getInstantPromiseError<string>(`schema object "${id}" not found`);
        else
            return getInstantPromise(objs[0].name);
    }


    async getSchemaObjectCollection(): Promise<Collection> {
        let db = await this.getMongoDb();
        return db.collection('SchemaObject');
    }

    async getObject(id: string): Promise<ISchemaObject> {
        let obj = this.objects_cache[id];
        if (obj !== undefined) {
            console.log("cache...");
            return getInstantPromise<ISchemaObject>(obj);
        }
        else if (this.objects_cache_is_loading[id] === true) {
            // если уже послан запрос на загрузку объекта, то просто ждем 200мс и запрашиваем снова
            await sleep(200);
            return this.getObject(id);
        }
        else {
            this.objects_cache_is_loading[id] = true;
            let db = await this.getMongoDb();
            var collection = db.collection("SchemaObject");
            let result = await collection.find({_id: id}).next();
            this.objects_cache_is_loading[id] = false;
            this.objects_cache[id] = result;
            return getInstantPromise<ISchemaObject>(result);
        }
    }

    async saveObject(obj: ISchemaObject): Promise<void> {

        let db = await this.getMongoDb();
        var collection = db.collection("SchemaObject");
        if (obj._id === undefined)
            obj._id = getRandomString();
        console.log('запись', obj);

        // конвертацию через JSON не убирать, мы избавляемся от observable, иначе массивы не сохраняются
        let result = await collection.updateOne({_id: obj._id}, JSON.parse(JSON.stringify(obj)), {upsert: true});

        if (result.upsertedCount + result.modifiedCount !== 1)
            throw `error saving SchemaObject (_id=${obj._id})`;
        this.objects_cache[obj._id] = obj;
        return getInstantPromise<void>(undefined);
    }

    async getObjectClassInstance<T extends SchemaObject<ISchemaObject>>(id: string): Promise<T> {
        return getInstantPromise(getObjectClassInstance<T>(await this.getObject(id)));
    }

}

export function getObjectClassInstance<T extends PersistentObject<IPersistentObject>>(obj: IPersistentObject): T {
    let classConstructor = objectClasses[obj._class] as any;
    if (classConstructor === undefined)
        throw  `class "${obj._class}" is not registered`;
    return new classConstructor(obj);
}

// getObject<T extends SchemaObject>(id: SchemaObjectId): Promise<T> {
//     id = id.toLowerCase();
//     return new Promise<T>(
//         (resolve: (obj: T) => void, reject: (error: string) => void) => {
//             let objConstructor = this.objects_cache[id];
//
//             if (!objConstructor) {
//
//                 if (this.objects_cache_is_loading[id] === true) {
//                     // если уже послан запрос на загрузку объекта, то просто ждем 200мс и запрашиваем снова
//                     setTimeout(() => {
//                         this.getObject(id).then((_obj: T) => resolve(_obj)).catch((_error: string) => reject(_error));
//                     }, 200);
//                 }
//                 else {
//                     this.objects_cache_is_loading[id] = true;
//                     console.log("load schema object from sql :" + id);
//                     let select = new SelectStmt()
//                         .table("SchemaObject")
//                         .column("parentObjectId")
//                         .column("position")
//                         .column("jsCode")
//                         .where("id", "=", new SqlGuidValue(id));
//
//                     this.db.executeSQL(select)
//                         .then((tables: DataTable[]) => {
//                             if (tables[0].rows.length < 1)
//                                 throwError("Ошибка загрузки компонента (SchemaObject). Не найден компонент с id='" + id.toLowerCase() + "'");
//                             let row = tables[0].rows[0];
//                             objConstructor = eval("(function(){return " + row["jsCode"] + "})");
//                             this.objects_cache[id] = objConstructor;
//                             let obj: any = objConstructor();
//                             obj.$$schema = this;
//                             obj.$$fillOwnerRecursive();
//                             delete this.objects_cache_is_loading[id];
//
//                             // эти два поля может менять грида при DragDrop
//                             obj.parentObjectId = row["parentObjectId"];
//                             obj.position = row["position"];
//
//                             resolve(obj as T);
//                         })
//                         .catch((error) => {
//                             throwError("Ошибка загрузки компонента с id='" + id.toLowerCase() + "', " + error);
//                         });
//                 }
//             }
//             else {
//                 let obj = objConstructor() as SchemaObject;
//                 obj.$$schema = this;
//                 obj.$$fillOwnerRecursive();
//
//                 resolve(obj as T);
//             }
//
//         });
//
// }
//
//
// saveObject(objectToSave: SchemaObject): Promise<void|string> {
//
//     if (!objectToSave.id)
//         objectToSave.id = getNewGuid();
//
//     //if (!objectToSave.createDate)
//     //  objectToSave.createDate = new Date();
//
//     // нормализация на всякий случай
//     objectToSave.id = objectToSave.id.toLowerCase();
//     if (_.isString(objectToSave.parentObjectId))
//         objectToSave.parentObjectId = objectToSave.parentObjectId.toLowerCase();
//     if (_.isString(objectToSave.createUserId))
//         objectToSave.createUserId = objectToSave.createUserId.toLowerCase();
//     if (_.isString(objectToSave.changeUserId))
//         objectToSave.changeUserId = objectToSave.changeUserId.toLowerCase();
//     if (_.isString(objectToSave.lockedByUserId))
//         objectToSave.lockedByUserId = objectToSave.lockedByUserId.toLowerCase();
//
//     let sql = new UpsertStmt("SchemaObject")
//         .column("id", new SqlGuidValue(objectToSave.id))
//         .column("parentObjectId", new SqlGuidValue(objectToSave.parentObjectId))
//         .column("name", new SqlStringValue(objectToSave.name))
//         .column("description", new SqlStringValue(objectToSave.description))
//         .column("typeId", new SqlGuidValue(objectToSave.getObjectTypeInfo().id))
//         .column("typeName", new SqlStringValue(objectToSave.getObjectTypeInfo().name))
//         .column("createDate", objectToSave.createDate)
//         .column("createUserId", new SqlGuidValue(objectToSave.createUserId))
//         .column("changeDate", objectToSave.changeDate)
//         .column("changeUserId", new SqlGuidValue(objectToSave.changeUserId))
//         .column("lockDateTime", objectToSave.lockDateTime)
//         .column("lockedByUserId", new SqlGuidValue(objectToSave.lockedByUserId))
//         .column("jsCode", new SqlStringValue(objectToHostJavaScript(objectToSave)))
//         .column("position", objectToSave.position)
//         .where("id", "=", new SqlGuidValue(objectToSave.id));
//
//     return this.db.executeSQL(sql).then(() => {
//         this.resetObjectCache(objectToSave.id!);
//     });
//
// }
//
// initSchemaStorage(): Promise<void|string> {
//     let batch: SqlBatch = [];
//
//     return this.db.selectToBoolean(new CheckTableExistsStmt("SchemaObject"))
//         .then((isTableExists: boolean) => {
//             if (isTableExists)
//                 throwError("таблица 'SchemaObject' уже существует, выберите чистую базу данных");
//
//             let sql = new CreateTableStmt("SchemaObject")
//                 .primaryKeyColumn("id", "guid")
//                 .column("parentObjectId", "guid")
//                 .column("name", "string", 255)
//                 .column("description", "string", 1000)
//                 .column("typeId", "guid")
//                 .column("typeName", "string", 255)
//                 .column("createDate", "datetime")
//                 .column("createUserId", "guid")
//                 .column("changeDate", "datetime")
//                 .column("changeUserId", "guid")
//                 .column("lockDateTime", "datetime")
//                 .column("lockedByUserId", "guid")
//                 .column("jsCode", "text")
//                 .column("position", "int");
//
//             this.db.executeSQL(sql);
//
//         });
//     // .then(() => {
//     //
//     //
//     // });
//
// }
//}
