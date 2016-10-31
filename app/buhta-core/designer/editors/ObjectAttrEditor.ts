import {IAttrEditor, AttrEditor} from "./AttrEditor";

export interface IObjectAttrEditor extends IAttrEditor {
    getObjectClassesList(): Function[];
}

export class ObjectAttrEditor extends AttrEditor {

    static getClassName(): string {
        return "buhta.ObjectAttrEditor";
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
        return "combobox";
    }

    getObjectClassesList(): Function[] {
        return [];
    }

}