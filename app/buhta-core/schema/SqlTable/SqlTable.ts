import {ISqlTableColumn, SqlTableColumn} from "./SqlTableColumn";
import {ISchemaObject, PersistentObject, SchemaObject} from "../SchemaObject";

import {getObjectClassInstance} from "../Schema";
import {getRandomString} from "../../utils/getRandomString";

export interface ISqlTable extends ISchemaObject {
    columns: ISqlTableColumn[];
    //indexes: SchemaTableIndex[] = [];
}

export class SqlTable extends SchemaObject<ISqlTable> {

    //get columns():

    static getClassName():string{
        return "buhta.SqlTable";
    }

    static createNew(): ISqlTable {
        return {
            _class: this.getClassName(),
            name: "Новая таблица",
            columns: [],
            createDate: new Date(),
            createUserID: getRandomString()
        } as ISqlTable;
    }

    prepareToSave() {

    }

    get columns(): SqlTableColumn[] {
        return this.obj.columns.map((col: ISqlTableColumn)=>getObjectClassInstance<SqlTableColumn>(col));
    }

    validate(errors: string[]) {
        let errTitle = "Ошибка в таблице '" + this.obj.name + "': ";

        this.obj.name = this.obj.name.trim();

        if (this.obj.name.length === 0)
            errors.push(errTitle + "'имя таблицы' не может быть пустым");

        if (this.obj.name.startsWith("#"))
            errors.push(errTitle + "'имя таблицы' не может начинаться с символа #");

        if (this.obj.columns.length === 0) {
            errors.push(errTitle + "список колонок пуст");
        }

        this.columns.forEach((col: SqlTableColumn)=> {
            col.validate(errors);
        });

        // this.indexes.forEach((tableIndex: SchemaTableIndex)=> {
        //     tableIndex.$$validate(errors);
        //     if (tableIndex.table!==this)
        //         errors.push(errTitle + "internal error 'index.table!==table'");
        //
        // });
    }

}


// registerSchemaObjectType({
//     id: SCHEMA_TABLE_TYPE_ID,
//     name: "Таблица",
//     description: "Sql таблица",
//     type: SchemaTable,
//     icon: SCHEMA_TABLE_ICON
// });
//
