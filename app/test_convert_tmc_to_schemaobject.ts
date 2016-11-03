import {cloneSqlToMongo} from "./cloneSqlToMongo";
var sql = require('mssql');
import {MongoClient, Db} from "mongodb";
import {sleep} from "./buhta-core/utils/sleep";
import {getSchema} from "./buhta-core/schema/Schema";

var config = {
    user: 'sa',
    password: '',
    server: 'dark',
    database: "mag3666",
    options: {
        instanceName: "sql2012"
    }
};

//var connection = new Connection(config);

var docKeys: number[] = [];


export async function convertSchemas() {
//    var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
    var url = 'mongodb://green/mik';
    let db = await MongoClient.connect(url);
    await convertMikDocs_internal(db);
    db.close();
}

(window as any).x = convertSchemas;

export async function testMongoConnect() {
//    var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';

    let counter = 0;

//    var url = 'mongodb://green/mik';
    //  let db: any;

    for (let i = 0; i < 1; i++) {
        //if (!db)
        //  db = await MongoClient.connect(url);

        //let db = await getSchemaDb();

        //var collection = db.collection('SchemaObject');
        let coll=await getSchema().getSchemaObjectCollection();

        coll.find().limit(10000).toArray().then((a: any[])=> {
            console.log(i, a);
        }).catch((err: any)=> {
            console.error(err);

        });
//        db.close();
    }
}

(window as any).z = testMongoConnect;


async function convertMikDocs_internal(db: Db) {
    var collection = db.collection("SchemaObject");

    let counter = 0;

    await sql.connect(config);
    let recordset = await new sql.Request().query("select * from SchemaObject") as any[];//
    //console.log(recordset);

    for (let i = 0; i < recordset.length; i++) {

        if (recordset[i].parentObjectId === "0")
            recordset[i].parentObjectId = null;

        await collection.insertOne(recordset[i]);

        counter++;
        if (counter % 10 === 0)
            console.log(counter);

    }

}


// function convert1Doc(key: number): Promise<void> {
//     return new Promise(
//         (resolve: () => void, reject: (error: string) => void) => {
//
//
//             resolve();
//         });
// }