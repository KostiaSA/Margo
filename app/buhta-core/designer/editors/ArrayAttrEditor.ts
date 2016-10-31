import {IAttrEditor, AttrEditor} from "./AttrEditor";

export interface IArrayAttrEditor extends IAttrEditor {
    maxLen?: number;
}

export class ArrayAttrEditor extends AttrEditor {

    static getClassName(): string {
        return "buhta.ArrayAttrEditor";
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