import {Db, MongoClient, MongoClientOptions} from "mongodb";

let db: Db;

export async function getSchemaDb(): Promise<Db> {
//    var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
    var url = 'mongodb://green/mik';
    if (!db) {
        let opt: MongoClientOptions = {
            server: {
                socketOptions: {
                    autoReconnect: true
                }
            }
        };
        db = await MongoClient.connect(url, opt);
    }
    return db;
//         var collection = db.collection('SchemaObject');
//         collection.find().limit(1).toArray().then((a: any[])=> {
//             console.log(i,a[0]);
//         }).catch((err: any)=> {
//             console.error(err);
//
//         });
// //        db.close();
}
