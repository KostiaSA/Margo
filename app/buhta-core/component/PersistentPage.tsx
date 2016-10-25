import * as React from "react";
import * as ReactDOM from "react-dom";
import {GridLayout2} from "./GridLayout2";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";
import {IPersistentLayoutProps, PersistentLayout} from "./PersistentLayout";
import {SchemaObject, ISchemaObject} from "../schema/SchemaObject";
import {ObjectID} from "mongodb";
import {getSchema} from "../schema/Schema";

let ReactGridLayout = require('react-grid-layout');

export interface IPersistentPageProps extends IPersistentLayoutProps, ISchemaObject {
    _id?: ObjectID;
    parentObjectID?: ObjectID;
    name: string;
    description?: string;

    createDate: Date;
    createUserID: ObjectID;

    changeDate?: Date;
    changeUserID?: ObjectID;

    lockDateTime?: Date;
    lockedByUserID?: ObjectID;

    position?: number;

}

export class PersistentPage extends SchemaObject<IPersistentPageProps> {

    //get columns():

    static getClassName(): string {
        return "buhta.PersistentPageComponent";
    }

    static createNew(): IPersistentPageProps {
        return {
            _class: this.getClassName(),
            name: "Новая page",
            columns: [],
            createDate: new Date(),
            createUserID: new ObjectID(),
            key: new ObjectID().toHexString()
        } as IPersistentPageProps;
    }

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
        getSchema().saveObject(this.props).then(()=>{
            console.log("save PersistentPageComponent Ok");
        });
    }

    render() {
        return (
            <div style={{ border:"2px solid sliver"}}>
                <span onClick={this.handleSave}>сохранить</span>
                <PersistentLayout {...this.props}>

                </PersistentLayout>
            </div>
        )
    }
}
