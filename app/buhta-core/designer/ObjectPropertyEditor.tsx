import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {objectClasses} from "../objectClasses";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {AttrEditor} from "./editors/AttrEditor";
import {observable, autorun} from "mobx";

export interface IObjectPropertEditorProps {
    editedObject: IPersistentObject;
    onChange?: ()=>void;
}

export interface IAttrFormatter {
    (value: any, row: IEasyPropertyGridRow): string;
}

export interface IAttrEditor extends IPersistentObject {
    attrName: string;
    attrTitle?: string;
    attrGroup: string;
    //editor: IAttrEditor;
    isReadonly?: boolean;
    formatter?: IAttrFormatter;
}

export interface IEasyPropertyGridRow {
    name: string;
    value: any,
    group?: string;
    editor: string;
    editorInstance: AttrEditor<IAttrEditor>;  // наша добавка
    formatter?: IAttrFormatter; // наша добавка
    valueObj: IPersistentObject,
    editedObj: IPersistentObject,
}


export class ObjectPropertyEditor extends React.Component<IObjectPropertEditorProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        this.editedObject = this.props.editedObject;
    }

    peContainer: any;
    peInstance: any;
    editedObject: IPersistentObject;

    render(): JSX.Element {
        return (
            <div ref={(e)=>this.peContainer=e}></div>
        )
    }

    getObjectEditors(obj: IPersistentObject, level: string): any[] {

        let ret: any[] = [];

        if (!obj || !obj._class)
            return ret;

        let objHandler = objectClasses[obj._class];
        if (!objHandler)
            throw `object class "${obj._class}" is not registered`;

        let objInstance = getObjectInstanceOfType(objHandler, [obj]) as PersistentObject<IPersistentObject>;

        let designerFormat = objInstance.getDesignerFormat();

        designerFormat.attributes.forEach((item: IAttrEditor)=> {

            let editorHandler = objectClasses[item._class];
            if (!editorHandler)
                throw `attr editor class "${item._class}" is not registered`;

            let editorInstance = getObjectInstanceOfType(editorHandler, [item]) as AttrEditor<IAttrEditor>;

            let row: IEasyPropertyGridRow = {
                name: level + (item.attrTitle || item.attrName),
                value: editorInstance.getAttrValue(obj),
                group: item.attrGroup,
                editor: editorInstance.getEasyEditor(obj),
                editorInstance: editorInstance,
                formatter: editorInstance.getFormatter(),
                valueObj: obj[item.attrName],
                editedObj: obj
            };
            ret.push(row);

            //console.log(item.attrName, obj[item.attrName]);
            this.getObjectEditors(obj[item.attrName], level + "<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>").forEach((item: IEasyPropertyGridRow)=> {
                ret.push(item);
            }, this);

        }, this);

        return ret;

    }


    // public componentDidUpdate(prevProps: IObjectPropertEditorProps, prevState: any, prevContext: any): void {
    //     if (prevProps.editedObject!==this.props.editedObject){
    //         ($(this.peContainer) as any).propertygrid("loadData",this.getObjectEditors(this.props.editedObject));
    //     }
    // }

    setEditedObject(obj: IPersistentObject) {
        this.editedObject = obj;
        this.loadEditors();
    }

    loadEditors() {
        window.setTimeout(()=> {
            ($(this.peContainer) as any).propertygrid("loadData", this.getObjectEditors(this.editedObject, ""));
        }, 1);
    }


    componentDidMount() {

        let peOptions = $.fn.propertygrid.defaults;
        peOptions.fit = true;
        peOptions.showHeader = false;
        peOptions.border = false;
        peOptions.showGroup = true;
        peOptions.data = this.getObjectEditors(this.editedObject, "");
        peOptions.onBeforeEdit = (index: number, row: IEasyPropertyGridRow): boolean => {
            return !row.editorInstance.getIsReadonly();  // делаем cancel
        };
        peOptions.onEndEdit = (index: number, row: IEasyPropertyGridRow) => {
            row.editorInstance.setAttrValue(row.editedObj, row.value, row);
            if (row.editorInstance.getIsNeedReloadPropertyEditor())
                this.loadEditors();
            if (this.props.onChange)
                this.props.onChange();
            //row.valueObj=this.editedObject
        };
        peOptions.columns[0][1].formatter = (value: any, row: IEasyPropertyGridRow) => {
            if (row.formatter)
                return row.formatter(value, row)
            else
                return value;
        };


        window.setTimeout(()=> {
            this.peInstance = ($(this.peContainer) as any).propertygrid(peOptions);
            //console.log(($(this.peContainer) as any).propertygrid("options").columns[0][1]);
        }, 1);

        // autorun(()=> {
        //     console.log("edtObj->", this.editedObject);
        //     //this.setEditedObject(this.editedObject);
        //     ($(this.peContainer) as any).propertygrid("loadData", this.getObjectEditors(this.editedObject, ""));
        //
        //     //this.loadEditors();
        // });


    };

    // renderTree(): JSX.Element {
    //     return <div ref={(e)=>this.peContainer=e}></div>;
    // }

}


