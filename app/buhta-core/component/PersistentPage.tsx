import * as React from "react";
import * as ReactDOM from "react-dom";
import {GridLayout2} from "./GridLayout2";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";
import {IPersistentLayoutProps, PersistentLayout} from "./PersistentLayout";
import {SchemaObject, ISchemaObject} from "../schema/SchemaObject";

import {getSchema} from "../schema/Schema";
import {getRandomString} from "../utils/getRandomString";

let ReactGridLayout = require('react-grid-layout');

export interface IPersistentPageProps extends IPersistentLayoutProps, ISchemaObject {
    _id?: string;
    parentObjectID?: string;
    name: string;
    description?: string;

    createDate: Date;
    createUserID: string;

    changeDate?: Date;
    changeUserID?: string;

    lockDateTime?: Date;
    lockedByUserID?: string;

    position?: number;

}

export class PersistentPage extends SchemaObject<IPersistentPageProps> {

    //get columns():

    static getClassName(): string {
        return "buhta.PersistentPageComponent";
    }

    // static createNew(): IPersistentPageProps {
    //     return {
    //         _class: this.getClassName(),
    //         name: "Новая page",
    //         columns: [],
    //         createDate: new Date(),
    //         createUserID: getRandomString(),
    //         key: getRandomString()
    //     } as IPersistentPageProps;
    // }

    prepareToSave() {

    }

    // get columns(): SqlTableColumn[] {
    //     return this.obj.columns.map((col: ISqlTableColumn)=>getObjectClassInstance<SqlTableColumn>(col));
    // }

    validate(errors: string[]) {
        // let errTitle = "Ошибка в таблице '" + this.obj.name + "': ";
        //
        // this.obj.name = this.obj.name.trim();
        //
        // if (this.obj.name.length === 0)
        //     errors.push(errTitle + "'имя таблицы' не может быть пустым");
        //
        // if (this.obj.name.startsWith("#"))
        //     errors.push(errTitle + "'имя таблицы' не может начинаться с символа #");
        //
        // if (this.obj.columns.length === 0) {
        //     errors.push(errTitle + "список колонок пуст");
        // }
        //
        // this.columns.forEach((col: SqlTableColumn)=> {
        //     col.validate(errors);
        // });

    }

}


export class PersistentPageComponent extends PersistentComponent<IPersistentPageProps> {

    handleSave = ()=> {
        console.log("save PersistentPageComponent");

        var cloned = JSON.parse(JSON.stringify(this.props)) as IPersistentPageProps;
        cloned.layout = this.persistentLayoutRef.layout;

       // cloned._id=getRandomString();
       // cloned.changeDate=new Date();

        console.log("save PersistentPageComponent", cloned);

        getSchema().saveObject(cloned).then(()=> {
            console.log("save PersistentPageComponent Ok");
        });
    }

    persistentLayoutRef: PersistentLayout;

    render() {
        return (
            <div style={{ border:"2px solid sliver"}}>
                <span onClick={this.handleSave}>сохранить</span>
                <PersistentLayout ref={(e)=>{this.persistentLayoutRef=e}} {...this.props}>

                </PersistentLayout>
            </div>
        )
    }
}
