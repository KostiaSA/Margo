import {IPersistentObject} from "../../schema/SchemaObject";
import {IAction} from "../Action";

export interface IArrayAttrEditor extends IPersistentObject {
    attrName: string;
    title?: string;
    actions?: IAction[];
}

export class ArrayAttrEditor {
    constructor(public edt: IArrayAttrEditor) {
    }

    static getClassName(): string {
        return "buhta.ArrayAttrEditor";
    }


    static createNew(): IArrayAttrEditor {
        return {
            _class: this.getClassName(),
        } as IArrayAttrEditor;
    }

    getTitle(): string {
        return this.edt.title || this.edt.attrName;
    }

}

