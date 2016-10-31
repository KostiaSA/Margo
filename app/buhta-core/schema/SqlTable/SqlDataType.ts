import {IPersistentObject, PersistentObject} from "../SchemaObject";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";

export interface ISqlDataType extends IPersistentObject {

}

export class SqlDataType<T extends ISqlDataType> extends PersistentObject<T> {

    // static getClassName():string{
    //     throw  "abstract error";
    //     //return "buhta.SqlDataType";
    // }
    //
    // static createNew(): T {
    //     throw  "abstract error";
    //     // return {
    //     //     _class: this.getClassName(),
    //     //     name:"НоваяКолонка",
    //     // } as ISqlTableColumn;
    // }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        //ret.attributes.push({attrName: "name", title: "имя колонки", _class: StringAttrEditor.getClassName()});
        //ret.attributes.push({attrName: "description", title: "описание", _class: StringAttrEditor.getClassName()});
        ret.getTitle=(obj:ISqlDataType)=>{
            throw  "abstract error";
            //return obj.name;
        };
        return ret;
    }

    // validate(errors: string[]) {
    //     let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";
    //
    //     this.obj.name = this.obj.name.trim();
    //
    //     if (this.obj.name.length === 0)
    //         errors.push(errTitle + "'имя колонки' не может быть пустым");
    //
    //     if (this.obj.name.startsWith("_"))
    //         errors.push(errTitle + "'имя колонки' не может начинаться с _");
    //
    // }
}


