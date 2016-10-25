import * as React from "react";
import * as mongoose from "mongoose";
//import * as mongoose from "mongoose";
import {MongoClient, ObjectID} from "mongodb";
import {convertDocs} from "./mag3305";
import {convertMikDocs} from "./mik";
import {getSchema} from "./buhta-core/schema/Schema";
import {SqlTable} from "./buhta-core/schema/SqlTable/SqlTable";
import {SqlTableColumn} from "./buhta-core/schema/SqlTable/SqlTableColumn";
import {ISqlStringDataType, SqlStringDataType} from "./buhta-core/schema/SqlTable/SqlStringDataType";
import {ISchemaObject, SchemaObject} from "./buhta-core/schema/SchemaObject";
import {GridLayout} from "./buhta-core/component/GridLayout";
import {PersistentPage, IPersistentPageProps, PersistentPageComponent} from "./buhta-core/component/PersistentPage";


interface IUser extends mongoose.Document {
    provider: string;
    id: string;
    authorId: string;
    displayName: string;
    emails: any;
    photos: any;
    show: boolean;
    created: Date;
    updated: Date;
}

var _schema: mongoose.Schema = new mongoose.Schema({
    provider: {
        type: String,
        require: true
    },
    id: {
        type: String,
        require: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    displayName: {
        type: String
    },
    emails: {
        type: mongoose.Schema.Types.Mixed
    },
    photos: {
        type: mongoose.Schema.Types.Mixed
    },
    show: Boolean,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
})
    .pre('save', function (next) {
        this.updated = new Date();
        next();
    });

var _model = mongoose.model < IUser >('User', _schema);

export class TestPage extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    handleClick1 = ()=> {
        //createSqlTable_test();
        //var mongoose = require('mongoose');
        // mongoose.connect('mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo');
        //
        // var Cat = mongoose.model('Cat', {name: String});
        //
        // var kitty = new Cat({name: 'Zildjian'});
        // kitty.save(function (err: string) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('meow');
        //     }
        // });
    };

    handleClick2 = ()=> {
        console.log("click2");
        this.printDelayed();
    };

    async my1(): Promise<string> {
        var p = new Promise<string>(resolve => {
            setTimeout(() => resolve('done!'), 1000);
        });
        return p;
    }


    handleClick3 = ()=> {
        console.log("click3");

        // let x=MongoClient;
        //
        // var MongoClient1 = require('mongodb').MongoClient
        //     , assert = require('assert');

        var url = 'mongodb://KostiaSA:sonyk795@ds061206.mlab.com:61206/margo';
        MongoClient.connect(url, function (err: any, db: any) {
            //assert.equal(null, err);
            console.log("Connected correctly to server");
            console.log(db);

            var collection = db.collection('documents');
            // Insert some documents
            collection.insert([
                {a: 1}, {a: 2}, {a: 3}
            ], function (err: any, result: any) {
                console.log(result);
                //assert.equal(3, result.result.n);
                //assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the document collection");
                //callback(result);
            });


            db.close();
        });
    };

    handleClick4 = ()=> {
        console.log("click4");
        convertDocs();
    };
    handleClick2008 = ()=> {
        console.log("click2008");
        convertMikDocs("2008");
    };
    handleClick2009 = ()=> {
        console.log("click2009");
        convertMikDocs("2009");
    };
    handleClick2010 = ()=> {
        console.log("click2010");
        convertMikDocs("2010");
    };
    handleClick2011 = ()=> {
        console.log("click2011");
        convertMikDocs("2011");
    };
    handleClick2012 = ()=> {
        console.log("click2012");
        convertMikDocs("2012");
    };
    handleClick2013 = ()=> {
        console.log("click2013");
        convertMikDocs("2013");
    };

    handleClickSchema = ()=> {
        console.log("clickSchema");

        let table=SqlTable.createNew();
        let col=SqlTableColumn.createNew();
        col.name="номер1";
        col.description="номер организации1";
        col.dataType=SqlStringDataType.createNew();
        table.columns.push(col);

        getSchema().saveObject(table);



        // getSchema().getObject("").then((obj: any)=> {
        //     console.log(obj);
        // });
    };

    handleClickSchemaLoad = ()=> {
        console.log("clickSchemaLoad");

        getSchema().getObject(new ObjectID("580f1b6a5d4c403630eeb642")).then((x:ISchemaObject)=>{
            console.log(x);
        });

        getSchema().getObject(new ObjectID("580f1b6a5d4c403630eeb642")).then((x:ISchemaObject)=>{
            console.log(x);
        });

        getSchema().getObjectClassInstance(new ObjectID("580f1b6a5d4c403630eeb642")).then((x:SchemaObject<ISchemaObject>)=>{
            console.log(x);
        });



        // getSchema().getObject("").then((obj: any)=> {
        //     console.log(obj);
        // });
    };



    render(): JSX.Element {

        let ppProps=PersistentPage.createNew();

        return (
            <div>тестовая стра!
                <button onClick={this.handleClick1}>mongo test1</button>
                <button onClick={this.handleClick2}>test2</button>
                <br/>
                <button onClick={this.handleClick3}>MONGO DIRECT test</button>
                <br/>
                <br/>
                <button onClick={this.handleClick4}>MONGO CONVERT MAG3305</button>
                <br/>
                <br/>
                <button onClick={this.handleClickSchema}>TEST SCHEMA CREATE</button>
                <br/>
                <button onClick={this.handleClickSchemaLoad}>TEST SCHEMA LOAD</button>
                <br/>
                <PersistentPageComponent {...ppProps}>

                </PersistentPageComponent>
            </div>
        );
    }


    async printDelayed() {
        let x: string = await this.my1();
        console.log(x);
    }
}


