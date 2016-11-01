
import {IPersistentObject} from "../../schema/SchemaObject";
import {IAttrEditor} from "../ObjectPropertyEditor";
import {AttrEditor} from "./AttrEditor";

export interface IDateTimeAttrEditor extends IAttrEditor {

}

export class DateTimeAttrEditor extends AttrEditor<IDateTimeAttrEditor>{

    static getClassName(): string {
        return "buhta.DateTimeAttrEditor";
    }

    // static getParentClassName():string{
    //     return "buhta.AttrEditor";
    // }

    static createNew(): IAttrEditor {
        return {
            _class: this.getClassName(),
        } as IAttrEditor;
    }

    getEasyEditor(editedObj: IPersistentObject): string {
        return "datetimebox";
    }


}