
import {ISchemaObject, PersistentObject, SchemaObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {Action} from "../../designer/Action";
import {ArrayAttrEditor, IArrayAttrEditor} from "../../designer/editors/ArrayAttrEditor";
import {ISchemaComponent} from "./SchemaComponent";

export interface ISchemaButton extends ISchemaComponent {
    text?:string;

}

export class SchemaButton extends SchemaObject<ISchemaButton> {

    static getClassName(): string {
        return "buhta.SchemaButton";
    }

    static getClassTitle(): string {
        return "button";
    }

    static createNew(): ISchemaButton {
        let obj:ISchemaButton=SchemaObject.createNew() as any;
        obj._class=this.getClassName();
        obj.name= "button";
        obj.children=[];
        return obj;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        //ret.attributes.push({attrName: "sqlName", title: "имя таблицы", _class: StringAttrEditor.getClassName()});

        ret.getTitle = (obj: ISchemaButton)=> {
            return obj.text + "  (" + SchemaButton.getClassTitle() + ")";
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


