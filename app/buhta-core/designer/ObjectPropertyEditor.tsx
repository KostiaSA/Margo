import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {objectClasses} from "../objectClasses";
import {IObjectDesignerAttr} from "./ObjectDesignerFormat";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";

export interface IObjectPropertEditorProps {
    editedObject: IPersistentObject;
}

export class ObjectPropertEditor extends React.Component<IObjectPropertEditorProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    peContainer: any;
    peInstance: any;

    render(): JSX.Element {
        return (
            <div ref={(e)=>this.peContainer=e}></div>
        )
    }

    getObjectEditors(obj: IPersistentObject): any[] {
        let ret: any[] = [];

        let objHandler = objectClasses[obj._class];
        if (!objHandler)
            throw `object class "${obj._class}" is not registered`;

        let objInstance = getObjectInstanceOfType(objHandler, [obj]) as PersistentObject<IPersistentObject>;

        let designerFormat = objInstance.getDesignerFormat();

        designerFormat.attributes.forEach((item: IObjectDesignerAttr)=> {
            ret.push({
                name: item.title || item.attrName,
                value: obj[item.attrName],
                group: item.editorGroup,
                editor: 'text'
            })
        }, this);

        return ret;

    }


    // public componentDidUpdate(prevProps: IObjectPropertEditorProps, prevState: any, prevContext: any): void {
    //     if (prevProps.editedObject!==this.props.editedObject){
    //         ($(this.peContainer) as any).propertygrid("loadData",this.getObjectEditors(this.props.editedObject));
    //     }
    // }

    setEditedObject(obj:IPersistentObject){
        ($(this.peContainer) as any).propertygrid("loadData",this.getObjectEditors(obj));
    }

    componentDidMount() {

        let peOptions = {
            fit: true,
            data: this.getObjectEditors(this.props.editedObject),
            onBeforeEdit: (index: number, row: any):boolean => {
                console.log(row);
                return false;
            }
        };

        window.setTimeout(()=> {
            this.peInstance = ($(this.peContainer) as any).propertygrid(peOptions);

            // this.getObjectEditors(this.props.editedObject).forEach((item:any)=>{
            //     this.peInstance.propertygrid("appendRow", item);
            // },this);


        }, 1);

    };

    // renderTree(): JSX.Element {
    //     return <div ref={(e)=>this.peContainer=e}></div>;
    // }

}


