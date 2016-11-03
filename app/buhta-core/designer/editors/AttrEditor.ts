import {IPersistentObject} from "../../schema/SchemaObject";
import {IAttrFormatter, IEasyPropertyGridRow, IAttrEditor} from "../ObjectPropertyEditor";


export class AttrEditor<T extends IAttrEditor> {
    constructor(public edt: T) {
    }

    getEasyEditor(editedObj: IPersistentObject): any {
        throw "abstract error";
    }

    getFormatter(): IAttrFormatter | undefined{
        return this.edt.formatter;
    }

    getTitle(): string {
        return this.edt.attrTitle || this.edt.attrName;
    }

    getAttrValue(editedObj: IPersistentObject): any {
        return editedObj[this.edt.attrName];
    }

    setAttrValue(editedObj: IPersistentObject, value: any, row:IEasyPropertyGridRow) {
        editedObj[this.edt.attrName] = value;
    }

    getIsReadonly(): boolean {
        return this.edt.isReadonly === true;
    }

    getIsNeedReloadPropertyEditor(): boolean {
        return false;
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
