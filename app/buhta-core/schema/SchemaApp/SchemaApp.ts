import {ISchemaObject, PersistentObject, SchemaObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {ISchemaComponent} from "../SchemaComponent/SchemaComponent";
import {StringAttrEditor} from "../../designer/editors/StringAttrEditor";
import {
    SchemaObjectAttrEditor, ISchemaObjectAttrEditor,
    ISchemaObjectLookupItem
} from "../../designer/editors/SchemaObjectAttrEditor";
import {getSchema} from "../Schema";

export interface ISchemaApp extends ISchemaObject {
    startPageId?: string;
}

export class SchemaApp extends SchemaObject<ISchemaApp> {

    static getClassName(): string {
        return "buhta.SchemaApp";
    }

    static getClassTitle(): string {
        return "приложение";
    }

    static createNew(): ISchemaApp {
        let obj: ISchemaApp = SchemaObject.createNew();
        obj._class = this.getClassName();
        obj.name = "Новое приложение";
        return obj;
    }

    async getObjList(): Promise<ISchemaObjectLookupItem[]> {

        let coll = await getSchema().getSchemaObjectCollection();

        let objs = await coll.find({},
            {
                name: 1
            })
            .toArray();

        return objs.map<ISchemaObjectLookupItem>((item: ISchemaObject)=> {
            return {_id: item._id!, text: item.name}
        });

    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();

        ret.attributes.push({
            attrGroup: "приложение",
            attrName: "startPageId",
            attrTitle: "стартовая страница",
            _class: SchemaObjectAttrEditor.getClassName(),
            getLookupList: this.getObjList
        } as ISchemaObjectAttrEditor);

        ret.getTitle = (obj: ISchemaApp)=> {
            return obj.name + "  (" + SchemaApp.getClassTitle() + ")";
        };

        return ret;
    }

    prepareToSave() {

    }

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
        //
        // // this.indexes.forEach((tableIndex: SchemaTableIndex)=> {
        // //     tableIndex.$$validate(errors);
        // //     if (tableIndex.table!==this)
        // //         errors.push(errTitle + "internal error 'index.table!==table'");
        // //
        // // });
    }

}


