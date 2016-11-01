import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {ObjectPropertEditor} from "./ObjectPropertyEditor";
import {SqlTableColumn} from "../schema/SqlTable/SqlTableColumn";
import {objectClasses} from "../objectClasses";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {IArrayAttrEditor, ArrayAttrEditor} from "./editors/ArrayAttrEditor";
import {getObjectOf} from "../utils/getObjectOf";
import {IAction} from "./Action";
import {getRandomString} from "../utils/getRandomString";

export interface IObjectDesignerProps {
    editedObject: IPersistentObject;
}


let myIdPropName = Symbol();

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
        this.reloadTreeSelectedNode();
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

    reloadTreeSelectedNode() {
        var node = this.easyTree("getSelected");
        let newNode = this.createTreeData(node.obj, node.id);
        node.text = newNode.text;
        this.easyTree("update", node);
    }

    reloadTree(idToSetFocus?:string) {
        this.easyTree("loadData", [this.createTreeData(this.props.editedObject, "root")]);
        if (idToSetFocus) {
            var nodeToFocus = this.easyTree("find", idToSetFocus);
            this.easyTree("select", nodeToFocus.target);
        }
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
                    }, this),
                    arrayAttrEditor: item
                };
                if (obj[item.attrName][myIdPropName])
                    ret.id=obj[item.attrName][myIdPropName];

                return ret;
            }, this)
        };
        if (obj[myIdPropName])
            root.id=obj[myIdPropName];

        return root;
    }


    componentDidMount() {

        let treeOptions = {
            data: [this.createTreeData(this.props.editedObject, "root")],
            onSelect: (node: any)=> {
                this.selectedObject = node.obj;
                this.propertyEditorInstance.setEditedObject(this.selectedObject);
            },
            onContextMenu: (e: any, node: any) => {
                e.preventDefault();
                this.easyTree("select", node.target);

                let menuEl = $("#context-menu") as any;
                menuEl.empty();

                // menuEl.menu("appendItem", {
                //     text: 'New жопа Item',
                //     iconCls: 'icon-ok',
                //     onclick: function () {
                //         alert('New Item')
                //     }
                // });

                if (node.arrayAttrEditor) {
                    node.arrayAttrEditor.actions.forEach((act: IAction)=> {
                        menuEl.menu("appendItem", {
                            text: act.text,
                            iconCls: act.iconCls,
                            onclick: () => {
                                if (act.onClick) {
                                    let newObject = act.onClick();
                                    if (newObject)
                                        newObject[myIdPropName]=getRandomString();
                                    this.reloadTree(newObject[myIdPropName]);

                                }
                            }
                        });

                    }, this);
                }

                menuEl.menu("show", {
                    left: e.pageX,
                    top: e.pageY
                });


                //console.log(($("#context-menu") as any).menu("options"));
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


