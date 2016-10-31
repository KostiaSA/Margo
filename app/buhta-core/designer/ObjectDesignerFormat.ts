import {IAttrEditor} from "./editors/AttrEditor";
import {IPersistentObject} from "../schema/SchemaObject";
import {IArrayAttrEditor} from "./editors/ArrayAttrEditor";


// export const NUMBER_EDITOR = "number";
//
//
//
//
// export interface IObjectDesignerNumberAttrEditor extends IAttrEditor {
//     min?: number;
//     max?: number;
// }

// export interface IObjectDesignerAttr {
//     attrName: string;
//     title?:string;
//     editor: IAttrEditor;
//     editorGroup?: string;
// }

export interface IObjectDesignerFormat {
    attributes: IAttrEditor[];
    arrays: IArrayAttrEditor[];
    getTitle:(obj:IPersistentObject)=>string;
}
