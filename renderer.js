// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


 alert("пиздец1");
//
// var app = require('electron').remote;
// var dialog = app.dialog;
//
// dialog.showSaveDialog(function (fileName) {
//     if (fileName === undefined){
//         console.log("You didn't save the file");
//         return;
//     }
//     // fileName is a string that contains the path and filename created in the save file dialog.
//     fs.writeFile(fileName, content, function (err) {
//         if(err){
//             alert("An error ocurred creating the file "+ err.message)
//         }
//
//         alert("The file has been succesfully saved");
//     });
// });

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    server: 'green',
    userName: 'sa',
    password: 'sonyk'

     ,options: {
     // debug: {
     // packet: true,
     // data: true,
     // payload: true,
     // token: false,
     // log: true
     // },
     database: 'AndroidWms',
     encrypt: true // for Azure users
     }

};

var connection = new Connection(config);

connection.on('connect', function(err) {
        // If no error, then good to go...
        //executeStatement();
       //alert("Ok-"+err);

    var x=[];


    request = new Request("SELECT top 300 Номер,Название  FROM ТМЦ", function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }

        connection.close();
        console.log(x);
    });


    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                x.push(column.value);
            }
        });
    });

    // request.on('done', function(rowCount, more) {
    //     console.log(rowCount + ' rows returned');
    //     console.log(x);
    // });

    // In SQL Server 2000 you may need: connection.execSqlBatch(request);
    connection.execSql(request);

    }
);