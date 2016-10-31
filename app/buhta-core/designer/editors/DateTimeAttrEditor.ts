import {IAttrEditor, AttrEditor} from "./AttrEditor";

export interface IDateTimeAttrEditor extends IAttrEditor {

}

export class DateTimeAttrEditor extends AttrEditor{

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

    getEasyEditor(): string {
        return "datetimebox";
    }


}