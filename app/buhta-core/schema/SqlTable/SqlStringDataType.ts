import {ISqlDataType, SqlDataType} from "./SqlDataType";
import {PersistentObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {StringAttrEditor} from "../../designer/editors/StringAttrEditor";

export interface ISqlStringDataType extends ISqlDataType {
    maxLen: number;
}

export class SqlStringDataType extends SqlDataType<ISqlStringDataType> {

    static getClassName(): string {
        return "buhta.SqlStringDataType";
    }

    static getClassTitle(): string {
        return "VARCHAR";
    }

    // static getParentClassName():string{
    //     return "buhta.SqlDataType";
    // }
    //

    static createNew(): ISqlStringDataType {
        return {
            _class: this.getClassName(),
            maxLen: 50
        } as ISqlStringDataType;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        ret.attributes.push({
            attrGroup: "инфо",
            attrName: "maxLen",
            attrTitle: "макс. длина",
            _class: StringAttrEditor.getClassName()
        });
        //ret.attributes.push({attrName: "description", title: "описание", _class: StringAttrEditor.getClassName()});
        ret.getTitle = (obj: ISqlDataType)=> {
            return `${SqlStringDataType.getClassTitle()}(${this.obj.maxLen})`;
            //return this.toString();
        };
        return ret;
    }

    toString(): string {
        return `${SqlStringDataType.getClassTitle()}(${this.obj.maxLen})`;
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


