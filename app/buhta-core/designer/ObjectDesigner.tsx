import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject, ISchemaObject} from "../schema/SchemaObject";
import {ObjectPropertyEditor} from "./ObjectPropertyEditor";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {IArrayAttrEditor, ArrayAttrEditor} from "./editors/ArrayAttrEditor";
import {IAction} from "./Action";
import {getRandomString} from "../utils/getRandomString";
import {objectClasses} from "../objectClasses";
import {EasyLinkButton} from "../easyui/linkbutton";
import {Div} from "../easyui/Div";
import {getSchema} from "../schema/Schema";
import {autorun, observable} from "mobx";
import {observer} from "mobx-react";

export interface IObjectDesignerProps {
    editedObject: ISchemaObject;
}


let myId = Symbol();

@observer
export class ObjectDesigner extends React.Component<IObjectDesignerProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        this.selectedObject = this.props.editedObject;
        this.editedObjectAsJson = JSON.stringify(this.props.editedObject);
    }

    //observableEditedObject:any;
    @observable editedObjectAsJson: string;
    @observable needToSave: boolean;

    selectedObject: IPersistentObject;

    propertyEditorInstance: ObjectPropertyEditor;

    handleObjectChange = ()=> {
        //this.reloadTreeSelectedNode();
        //this.needToSave = this.editedObjectAsJson !== JSON.stringify(this.props.editedObject);
    }



    easyTree = (arg1: any, arg2?: any): any=> {
        return ($(this.treeContainer) as any).tree(arg1, arg2);
    }

    // reloadTreeSelectedNode() {
    //     var node = this.easyTree("getSelected");
    //     if (node) {
    //         let newNode = this.createTreeData(node.obj, node.id);
    //         node.text = newNode.text;
    //         this.easyTree("update", node);
    //     }
    // }

    reloadTree(idToSetFocus?: string) {
        this.easyTree("loadData", [this.createTreeData(this.props.editedObject, "root")]);
        if (idToSetFocus) {
            var nodeToFocus = this.easyTree("find", idToSetFocus);
            this.easyTree("select", nodeToFocus.target);
        }
    }

    layoutContainer: Layout;


    toolbarContainer: any;
    treeContainer: any;
    peContainer: any;
    peInstance: any;

    createTreeData(obj: IPersistentObject, id: string): any {
        let objHandler = objectClasses[obj._class];
        if (!objHandler) {
            //return;
            throw `object class "${obj._class}" is not registered`;
        }

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
                    obj: obj[item.attrName], // array
                    children: obj[item.attrName].map((_item: any, index: number)=> {
                        //_item[parentArray]=obj[item.attrName];
                        return this.createTreeData(_item, itemId + ":" + index.toString());
                    }, this),
                    arrayAttrEditor: item
                };
                if (obj[item.attrName][myId])
                    ret.id = obj[item.attrName][myId];

                return ret;
            }, this),
            designerFormat: designerFormat
        };
        if (obj[myId])
            root.id = obj[myId];
        return root;
    }

    componentDidMount() {

        let treeOptions = {
            //  data: здесь не заполнять !!!
            onSelect: (node: any)=> {
                this.selectedObject = node.obj;
                this.propertyEditorInstance.setEditedObject(this.selectedObject);
            },
            onContextMenu: (e: any, node: any) => {
                e.preventDefault();
                this.easyTree("select", node.target);

                let menuEl = $("#context-menu") as any;
                menuEl.empty();

                if (node.arrayAttrEditor && node.arrayAttrEditor.actions) {
                    node.arrayAttrEditor.actions.forEach((act: IAction)=> {
                        menuEl.menu("appendItem", {
                            text: act.text,
                            iconCls: act.iconCls,
                            onclick: () => {
                                if (act.onClick) {
                                    let parentNode = this.easyTree("getParent", node.target);
                                    let newObject = act.onClick(parentNode!.obj);
                                    if (newObject)
                                        newObject[myId] = getRandomString();
                                    this.reloadTree(newObject[myId]);

                                }
                            }
                        });

                    }, this);
                }

                if (node.designerFormat && node.designerFormat.actions) {
                    node.designerFormat.actions.forEach((act: IAction)=> {
                        menuEl.menu("appendItem", {
                            text: act.text,
                            iconCls: act.iconCls,
                            onclick: () => {
                                if (act.onClick) {
                                    let parentNode = this.easyTree("getParent", node.target);
                                    let newObject = act.onClick(parentNode!.obj);
                                    if (newObject) {
                                        newObject[myId] = getRandomString();
                                        this.reloadTree(newObject[myId]);
                                    }
                                    else
                                        this.reloadTree();
                                }
                            }
                        });

                    }, this);
                }

                if (menuEl.children().length > 0) {
                    menuEl.menu("show", {
                        left: e.pageX,
                        top: e.pageY
                    });
                }
            }
        };

        window.setTimeout(()=> {
            this.easyTree(treeOptions);
            this.easyTree("loadData", [this.createTreeData(this.props.editedObject, "root")]);
            var nodeToFocus = this.easyTree("getRoot");
            this.easyTree("select", nodeToFocus.target);
        }, 1);


        observable(this.props.editedObject);
        autorun(() => {
            //console.log("autorun-observableEditedObject");
            this.needToSave = this.editedObjectAsJson !== JSON.stringify(this.props.editedObject);
            this.reloadTreeSelectedNode();
        });

    };

    reloadTreeSelectedNode() {
        var node = this.easyTree("getSelected");
        if (node && node.obj && node.obj._class) {
            let newNode = this.createTreeData(node.obj, node.id);
            node.text = newNode.text;
            this.easyTree("update", node);
        }
    }

    saveEditedObject = ()=> {
        getSchema().saveObject(this.props.editedObject)
            .then(()=> {
                this.editedObjectAsJson = JSON.stringify(this.props.editedObject);
            })
            .catch((e: any)=> {
                throw e;
            });
    }

    renderPropertyEditor(): JSX.Element {
        //console.log("renderPropertyEditor");
        return (
            <ObjectPropertyEditor
                ref={(e)=>this.propertyEditorInstance=e}
                editedObject={this.selectedObject}
                onChange={this.handleObjectChange}
            >

            </ObjectPropertyEditor>);
    }

    renderToolbar(): JSX.Element {
        return (
            <div>
                <EasyLinkButton
                    plain
                    iconCls="icon-disk-black"
                    text={"сохранить" }
                    disabled={!this.needToSave}
                    onPress={this.saveEditedObject}
                />
            </div>

        ) as any;
    }

    renderTree(): JSX.Element {
        return <div ref={(e)=>this.treeContainer=e}></div>;
    }

    render(): JSX.Element {
        return (
            <Layout ref={(e)=>this.layoutContainer=e}
                    _class="Layout"
                    fit={true}
                    border={false}
                    north={{_class:"LayoutPanel", height:62, border:false, content:this.renderToolbar()}}
                    center={{_class:"LayoutPanel", /*title:"Состав объекта",*/ border:true, content:this.renderTree()}}
                    east={{_class:"LayoutPanel", /*title:"Свойства",*/ border:true, width:350, split:true, content:this.renderPropertyEditor()}}

            />
        )
    }

}


