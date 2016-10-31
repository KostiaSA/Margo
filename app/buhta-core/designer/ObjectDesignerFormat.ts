import {IAttrEditor} from "./editors/AttrEditor";


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
}
