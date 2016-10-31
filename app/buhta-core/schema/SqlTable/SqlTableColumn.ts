import {IPersistentObject, PersistentObject} from "../SchemaObject";
import {ISqlDataType} from "./SqlDataType";
import {IObjectDesignerFormat, STRING_EDITOR} from "../../designer/ObjectDesignerFormat";

export interface ISqlTableColumn extends IPersistentObject {
    name: string;
    dataType?: ISqlDataType;
    description?: string;
    notNull?: boolean;
    //primaryKey: boolean;
}

export class SqlTableColumn extends PersistentObject<ISqlTableColumn> {
    static getClassName():string{
        return "buhta.SqlTableColumn";
    }

    static createNew(): ISqlTableColumn {
        return {
            _class: this.getClassName(),
            name:"Новая колока",
        } as ISqlTableColumn;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        ret.attributes.push({attrName: "name", title: "имя колонки", editor: {editorClass: STRING_EDITOR}});
        ret.attributes.push({attrName: "description", title: "описание", editor: {editorClass: STRING_EDITOR}});
        return ret;
    }

    validate(errors: string[]) {
        let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";

        this.obj.name = this.obj.name.trim();

        if (this.obj.name.length === 0)
            errors.push(errTitle + "'имя колонки' не может быть пустым");

        if (this.obj.name.startsWith("$$"))
            errors.push(errTitle + "'имя колонки' не может начинаться с $$");

    }
}


