import {IPersistentObject} from "../../schema/SchemaObject";

export interface IAttrEditor extends IPersistentObject {
    attrName: string;
    title?: string;
    //editor: IAttrEditor;
    editorGroup?: string;
    isReadonly?: boolean;
}

export class AttrEditor {
    constructor(public edt: IAttrEditor) {
    }

    getEasyEditor(): string {
        throw "abstract error";
    }

    getTitle(): string {
        return this.edt.title || this.edt.attrName;
    }

    setAttrValue(editedObj: IPersistentObject, value: any) {

        editedObj[this.edt.attrName] = value;
        //console.log("setAttrValue",value,editedObj);
    }

    getIsReadonly(): boolean {
        return this.edt.isReadonly === true;
    }

}

// export let attrEditors: { [className: string]: Function;} = {};
//
// export function registerEditors(_class: Function) {
//     let className = (_class as any).getClassName();
//     if (attrEditors[className] !== undefined)
//         throw `editor "${className}" is already registered`;
//     attrEditors[className] = _class;
//     console.log(`register editor "${className}"`);
// }
