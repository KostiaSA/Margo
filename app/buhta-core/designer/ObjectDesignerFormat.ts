export const STRING_EDITOR = "string";
export const NUMBER_EDITOR = "number";


export interface IObjectDesignerAttrEditor {
    editorClass: string;
}

export interface IObjectDesignerStringAttrEditor extends IObjectDesignerAttrEditor {
    maxLen?: number;
}

export interface IObjectDesignerNumberAttrEditor extends IObjectDesignerAttrEditor {
    min?: number;
    max?: number;
}

export interface IObjectDesignerAttr {
    attrName: string;
    title?:string;
    editor: IObjectDesignerAttrEditor;
    editorGroup?: string;
}

export interface IObjectDesignerFormat {
    attributes: IObjectDesignerAttr[];
}
