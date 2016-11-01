import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {ObjectPropertEditor} from "./ObjectPropertyEditor";
import {SqlTableColumn} from "../schema/SqlTable/SqlTableColumn";
import {objectClasses} from "../objectClasses";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {IArrayAttrEditor, ArrayAttrEditor} from "./editors/ArrayAttrEditor";

export interface IObjectDesignerProps {
    editedObject: IPersistentObject;
}

export class ObjectDesigner extends React.Component<IObjectDesignerProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        this.selectedObject = this.props.editedObject;
    }


    selectedObject: IPersistentObject;
    propertyEditorInstance: ObjectPropertEditor;

    handleObjectChange = ()=> {
        this.reloadSelectedNode();
    }

    renderPropertyEditor(): JSX.Element {
        return (
            <ObjectPropertEditor
                ref={(e)=>this.propertyEditorInstance=e}
                editedObject={this.selectedObject}
                onChange={this.handleObjectChange}
            >

            </ObjectPropertEditor>);
    }


    easyTree = (arg1: any, arg2?: any): any=> {
        return ($(this.treeContainer) as any).tree(arg1, arg2);
    }

    reloadSelectedNode() {
        var node = this.easyTree("getSelected");
        let newNode = this.createTreeData(node.obj, node.id);
        node.text=newNode.text;
        this.easyTree("update", node);
    }

    render(): JSX.Element {

        return (
            <Layout _class="Layout" fit={true} panels={[
                            {_class:"LayoutPanel", title:"Состав объекта", region:"west",split:true, width:350, content:this.renderTree()},
                            {_class:"LayoutPanel", title:"center", region:"center",content:this.renderPropertyEditor()},
            ]}/>
        )


    }

    treeContainer: any;
    peContainer: any;
    peInstance: any;

    createTreeData(obj: IPersistentObject, id: string): any {

        let objHandler = objectClasses[obj._class];
        if (!objHandler)
            throw `object class "${obj._class}" is not registered`;

        let objInstance = getObjectInstanceOfType(objHandler, [obj]) as PersistentObject<IPersistentObject>;
        let designerFormat = objInstance.getDesignerFormat();

        let root = {
            id: id,
            text: designerFormat.getTitle(obj),
            state: "opened",
            obj: obj,
            children: designerFormat.arrays.map((item: IArrayAttrEditor, index: number)=> {
                let itemId = id + ":" + item.attrName;
                let itemHandler = objectClasses[item._class];
                if (!itemHandler)
                    throw `object class "${item._class}" is not registered`;
                let itemInstance = getObjectInstanceOfType(itemHandler, [item]) as ArrayAttrEditor;

                let ret = {
                    id: itemId,
                    text: itemInstance.getTitle(),
                    state: "opened",
                    obj: obj[item.attrName],
                    children: obj[item.attrName].map((_item: any, index: number)=> {
                        return this.createTreeData(_item, itemId + ":" + index.toString());
                    }, this)
                };
                return ret;
            }, this)
        };
        return root;
    }


    componentDidMount() {

        let treeOptions = {
            data: [this.createTreeData(this.props.editedObject, "root")],
            onSelect: (node: any)=> {
                this.selectedObject = node.obj;
                this.propertyEditorInstance.setEditedObject(this.selectedObject);
            }
        };

        window.setTimeout(()=> {
            this.easyTree(treeOptions);
        }, 1);

    };

    renderTree(): JSX.Element {
        return <div ref={(e)=>this.treeContainer=e}></div>;
    }

}


