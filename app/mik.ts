import {cloneSqlToMongo} from "./cloneSqlToMongo";
var sql = require('mssql');
import {MongoClient, Db} from "mongodb";

var config = {
    user: 'sa',
    password: 'sonyk',
    server: 'green',
    database: "miktest"
};

//var connection = new Connection(config);

var docKeys: number[] = [];


export async function convertMikDocs(year: string) {
//    var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
    var url = 'mongodb://green/mik';
    let db = await MongoClient.connect(url);
    await convertMikDocs_internal(db, year);
    db.close();
}


async function convertMikDocs_internal(db: Db, year: string) {
    var collection = db.collection('Документ');

    let counter = 0;

    await sql.connect(config);
    let recordset = await new sql.Request().query("select top 1 Ключ from Документ where YEAR(Дата)='" + year + "' order by Ключ") as any[];//
    //console.log(recordset);

    for (let i = 0; i < recordset.length; i++) {

        let docKey = recordset[i].Ключ;
        let docRows = await new sql.Request().query(`SELECT *  FROM [Документ] where Ключ=` + docKey);//
        let docRow = docRows[0];

        let provRows = await new sql.Request().query(`SELECT * FROM [Проводка]  where [Документ] =` + docKey);//
        let specRows = await new sql.Request().query(`SELECT * FROM [Докспец]  where [Документ] =` + docKey);//

        let mongoDocRow = cloneSqlToMongo(docRow);

        mongoDocRow.Проводка = provRows.map((item: any)=> {
            return cloneSqlToMongo(item);
        });

        mongoDocRow.Докспец = specRows.map((item: any)=> {
            return cloneSqlToMongo(item);
        });

        //console.log(mongoDocRow);

        await collection.insertOne(mongoDocRow);

        counter++;
        if (counter % 100 === 0)
            console.log(counter);

    }

}


function convert1Doc(key: number): Promise<void> {
    return new Promise(
        (resolve: () => void, reject: (error: string) => void) => {


            resolve();
        });
}