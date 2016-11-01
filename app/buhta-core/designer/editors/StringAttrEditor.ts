
import {IPersistentObject} from "../../schema/SchemaObject";
import {IAttrEditor} from "../ObjectPropertyEditor";
import {AttrEditor} from "./AttrEditor";

export interface IStringAttrEditor extends IAttrEditor {
    maxLen?: number;
}

export class StringAttrEditor extends AttrEditor<IStringAttrEditor>{

    static getClassName(): string {
        return "buhta.StringAttrEditor";
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
        return "text";
    }


}