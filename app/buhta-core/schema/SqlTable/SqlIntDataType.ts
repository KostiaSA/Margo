import {ISqlDataType, SqlDataType} from "./SqlDataType";
import {PersistentObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {StringAttrEditor} from "../../designer/editors/StringAttrEditor";

export interface ISqlIntDataType extends ISqlDataType {
    maxLen: number;
}

export class SqlIntDataType extends SqlDataType<ISqlIntDataType> {

    static getClassName(): string {
        return "buhta.SqlIntDataType";
    }

    static getClassTitle(): string {
        return "INT";
    }

    static createNew(): ISqlIntDataType {
        return {
            _class: this.getClassName(),
        } as ISqlIntDataType;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        //ret.attributes.push({attrName: "maxLen", title: "макс. длина", _class: StringAttrEditor.getClassName()});
        //ret.attributes.push({attrName: "description", title: "описание", _class: StringAttrEditor.getClassName()});
        ret.getTitle = (obj: ISqlDataType)=> {
            return `${SqlIntDataType.getClassTitle()}`;
            //return this.toString();
        };
        return ret;
    }

    toString(): string {
        return `${SqlIntDataType.getClassTitle()}`;
    }


    validate(errors: string[]) {
        // let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";
        //
        // this.obj.name = this.obj.name.trim();
        //
        // if (this.obj.name.length === 0)
        //     errors.push(errTitle + "'имя колонки' не может быть пустым");
        //
        // if (this.obj.name.startsWith("_"))
        //     errors.push(errTitle + "'имя колонки' не может начинаться с _");

    }
}


