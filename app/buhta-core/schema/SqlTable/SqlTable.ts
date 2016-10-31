import {ISqlTableColumn, SqlTableColumn} from "./SqlTableColumn";
import {ISchemaObject, PersistentObject, SchemaObject} from "../SchemaObject";

import {getObjectClassInstance} from "../Schema";
import {getRandomString} from "../../utils/getRandomString";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {StringAttrEditor} from "../../designer/editors/StringAttrEditor";
import {ArrayAttrEditor} from "../../designer/editors/ArrayAttrEditor";

export interface ISqlTable extends ISchemaObject {
    sqlName?: string;
    columns: ISqlTableColumn[];
    //indexes: SchemaTableIndex[] = [];
}

export class SqlTable extends SchemaObject<ISqlTable> {


    static getClassName(): string {
        return "buhta.SqlTable";
    }

    static createNew(): ISqlTable {
        return {
            _class: this.getClassName(),
            name: "НоваяТаблица",
            columns: [],
            createDate: new Date(),
            createUserID: getRandomString()
        } as ISqlTable;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        ret.attributes.push({attrName: "sqlName", title: "имя таблицы", _class: StringAttrEditor.getClassName()});
        ret.arrays.push({attrName: "columns", title: "колонки", _class: ArrayAttrEditor.getClassName()});

        ret.getTitle = (obj: ISqlTableColumn)=> {
            return obj.name + "  (таблица)";
        };

        return ret;
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
