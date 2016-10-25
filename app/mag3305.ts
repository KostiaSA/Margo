var sql = require('mssql');
import {MongoClient, Db} from "mongodb";

var config = {
    user: 'sa',
    password: 'sonyk',
    server: 'localhost',
    database: "mag3305"
};

//var connection = new Connection(config);

var docKeys: number[] = [];


export async function convertDocs() {
//    var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
    var url = 'mongodb://localhost/mag3305';
    let db = await MongoClient.connect(url);
    await convertDocs_internal(db);
    db.close();
}

async function convertDocs_internal(db:Db) {

    await sql.connect(config);
    let recordset = await new sql.Request().query("select top 50000000 Ключ from Документ order by Ключ") as any[];//
    //console.log(recordset);


    for (let i = 0; i < recordset.length; i++) {

        let docKey = recordset[i].Ключ;
        let docRow = await new sql.Request().query(`
SELECT [Ключ]
      ,[Номер]
      ,[Автономер]
      ,[Вид]
      ,[Дата]
      ,[Юр.лицо] ЮрЛицо 
      ,[Договор]
      ,[Тип поставщика] ТипПоставщика
      ,[Поставщик]
      ,[Тип получателя] ТипПолучателя
      ,[Получатель]
      ,[Текст]
      ,[Грузоотправитель]
      ,[Грузополучатель]
      ,[Ответственный]
      ,[Водитель]
      ,[Адрес]
      ,[Сумма]
      ,[Валюта]
      --,[Сумма руб.]
      --,[Сумма у.е.]
      --,[РС поставщика]
      --,[РС получателя]
      --,[Вид платежа]
      --,[Вид операции]
      --,[Назначение платежа]
      --,[Срок платежа]
      --,[Очередность платежа]
      --,[Кто создал]
      --,[Когда создал]
      --,[Кто изменил]
      --,[Когда изменил]
      --,[Есть НДС]
      --,[НДС в том числе]
      --,[Есть НП]
      --,[НП в том числе]
      --,[Сумма спецификации]
      --,[Сумма без налогов]
      --,[Сумма НДС 10]
      --,[Сумма НДС 20]
      --,[Сумма НП]
      --,[Сумма НДС 18]
      --,[Сумма возвратной тары]
      --,[Сумма амортизации тары]
      --,[Сумма таможенных платежей]
      --,[Сумма спецификации всего]
      --,[Валюта спецификации]
      --,[Дата генерации]
      --,[Ошибки генерации]
      --,[Проведен]
      --,[Ошибки зарплаты]
      --,[Предупреждения зарплаты]
      --,[Без пересчета НДС]
      --,[Расчет НДС от суммы документа]
      --,[Заблокирован]
      --,[Номер счета-фактуры]
      --,[Дата счета-фактуры]
      --,[ГТД]
      --,[ПП.Статус плательщика]
      --,[ПП.КБК]
      --,[ПП.Код ОКАТО]
      --,[ПП.Основание платежа]
      --,[ПП.Налоговый период]
      --,[ПП.Номер документа]
      --,[ПП.Дата документа]
      --,[ПП.Тип платежа]
      --,[Содержание операции в книге дох.]
      --,[Дата поступления счета-фактуры]
      --,[Внутридневной приоритет]
      --,[Номер доп.листа]
      --,[Исходный счет-фактура]
      --,[Номер исправления СФ]
      --,[Дата исправления СФ]
      --,[Код способа выставления СФ]
      --,[Код вида операции СФ]
      --,[Уменьшение стоимости]
      --,[ПП.Код УИН]
      --,[_Дата экспорта в САП]
      --,[ReplGuid]
      --,[_CRM_РегистрацияВозврата]
      --,[_ПричинаВозврата]
      --,[_ПричинаВозвратаТекст]
      --,[_Возврат_АктТехнЭкспертизы]
      --,[_Возврат_ГарантийныйТалон]
      --,[_ТипВозвратаТовара]
      --,[_НомерСервисногоСообщения]
      --,[_КассаСерийныйНомер]
      --,[_КассаНомерСессии]
      --,[Тип посредника]
      --,[Посредник]
  FROM [Документ] where Ключ=
` + docKey);//

        //console.log("docRow",docRow[0]);

        let provRows = await new sql.Request().query(`
SELECT [Ключ]
      ,[Документ]
      ,[Вид]
      ,[Дата]
      ,[Юр.лицо] ЮрЛицо
      ,[Дебет]
      ,[Дб тип субконто 1]
      ,[Дб субконто 1]
      ,[Дб тип субконто 2]
      ,[Дб субконто 2]
      ,[Дб тип субконто 3]
      ,[Дб субконто 3]
      ,[Дб тип субконто 4]
      ,[Дб субконто 4]
      ,[Дб тип субконто 5]
      ,[Дб субконто 5]
      ,[Дб количество]
      ,[Дб количество 2]
      ,[Кредит]
      ,[Кр тип субконто 1]
      ,[Кр субконто 1]
      ,[Кр тип субконто 2]
      ,[Кр субконто 2]
      ,[Кр тип субконто 3]
      ,[Кр субконто 3]
      ,[Кр тип субконто 4]
      ,[Кр субконто 4]
      ,[Кр тип субконто 5]
      ,[Кр субконто 5]
      ,[Кр количество]
      ,[Кр количество 2]
      ,[Сумма]
      ,[Валюта]
      ----,[Сумма руб.]
      ----,[Курс руб.]
      ----,[Сумма у.е.]
      ----,[Курс у.е.]
      ,[Входит в сумму]
      ,[ГенТип]
      ,[Порядок ввода]
      ,[Примечание]
      ,[Ошибки генерации]
      ,[Зарплата]
      ,[Докспец]
      ,[ReplGuid]
  FROM [Проводка]  where [Документ] =
` + docKey);//

      //  console.log("provRows",provRows[0]);

        docRow[0].Проводки=provRows;


        var collection = db.collection('Документ2');
        // Insert some documents
        await collection.insertOne(docRow[0]);

        console.log(i);

    }


    // // // .then(function(recordset) {
    // //     console.dir(recordset);
    // // }).catch(function(err) {
    // //     // ... error checks
    // // });
    //
    // connection.on('connect', function (err: any) {
    //
    //     console.log(err);
    //
    //     var Request = require('tedious').Request;
    //
    //     let request = new Request("select top 3 Ключ from Документ order by Ключ", function (err: any, rowCount: number) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log(rowCount + ' rows');
    //
    //
    //
    //         }
    //     });
    //
    //     request.on('row', function (columns: any[]) {
    //         columns.forEach(function (column: any) {
    //             docKeys.push(column.value);
    //             console.log(column.value);
    //         });
    //     });
    //
    //
    //     connection.execSql(request);
    // });
}


function convert1Doc(key: number): Promise<void> {
    return new Promise(
        (resolve: () => void, reject: (error: string) => void) => {


            resolve();
        });
}