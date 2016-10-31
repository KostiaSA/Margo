import {IAttrEditor, AttrEditor} from "./AttrEditor";

export interface IStringAttrEditor extends IAttrEditor {
    maxLen?: number;
}

export class StringAttrEditor extends AttrEditor{

    static getClassName(): string {
        return "buhta.StringAttrEditor";
    }

    static createNew(): IAttrEditor {
        return {
            _class: this.getClassName(),
        } as IAttrEditor;
    }

    getEasyEditor(): string {
        return "text";
    }


}