import * as React from "react";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject, ISchemaObject} from "../schema/SchemaObject";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {IArrayAttrEditor, ArrayAttrEditor} from "./editors/ArrayAttrEditor";
import {IAction} from "./Action";
import {getRandomString} from "../utils/getRandomString";
import {objectClasses} from "../objectClasses";
import {IEasyTreeNode} from "../easyui/tree";
import {getSchemaObjectCollection} from "../schema/getSchemaObjectCollection";
import {compareNumbers} from "../utils/compareNumbers";
import {renderToStaticHtml} from "../utils/renderToStaticHtml";


export interface ISchemaDesignerProps {
    //  editedObject: IPersistentObject;
}


let myId = Symbol();

interface ITreeNode extends IEasyTreeNode {
    key: string;
    parentKey?: string;
    obj: ISchemaObject;
    sourceIndex: number;
    parent?: ITreeNode;
    level?: number;
    children?: ITreeNode[]
}


export class SchemaDesigner extends React.Component<ISchemaDesignerProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
        // this.selectedObject = this.props.editedObject;
    }


    selectedObject: IPersistentObject;
    tabsInstance: any;

    handleObjectChange = ()=> {
        this.reloadTreeSelectedNode();
    }

    renderTabs(): JSX.Element {
        return (
            <div>
                это табс
            </div>);
    }


    easyTree = (arg1: any, arg2?: any): any=> {
        return ($(this.treeContainer) as any).tree(arg1, arg2);
    }

    reloadTreeSelectedNode() {
        // var node = this.easyTree("getSelected");
        // let newNode = this.createTreeData();
        // node.text = newNode.text;
        // this.easyTree("update", node);
    }

    reloadTree(idToSetFocus?: string) {
        // this.easyTree("loadData", [this.createTreeData(this.props.editedObject, "root")]);
        // if (idToSetFocus) {
        //     var nodeToFocus = this.easyTree("find", idToSetFocus);
        //     this.easyTree("select", nodeToFocus.target);
        // }
    }

    render(): JSX.Element {

        return (
            <Layout _class="Layout" fit={true} panels={[
                            {_class:"LayoutPanel", title:"Схема приложения", region:"west",split:true, width:450, content:this.renderTree()},
                            {_class:"LayoutPanel", title:"табсы", region:"center",content:this.renderTabs()},
            ]}/>
        )


    }

    treeContainer: any;
    // peContainer: any;
    // peInstance: any;

    // createTreeData_old(obj: IPersistentObject, id: string): any {
    //
    //     let objHandler = objectClasses[obj._class];
    //     if (!objHandler)
    //         throw `object class "${obj._class}" is not registered`;
    //
    //     let objInstance = getObjectInstanceOfType(objHandler, [obj]) as PersistentObject<IPersistentObject>;
    //     let designerFormat = objInstance.getDesignerFormat();
    //
    //     let root = {
    //         id: id,
    //         text: designerFormat.getTitle(obj),
    //         state: "opened",
    //         obj: obj,
    //         children: designerFormat.arrays.map((item: IArrayAttrEditor, index: number)=> {
    //             let itemId = id + ":" + item.attrName;
    //             let itemHandler = objectClasses[item._class];
    //             if (!itemHandler)
    //                 throw `object class "${item._class}" is not registered`;
    //             let itemInstance = getObjectInstanceOfType(itemHandler, [item]) as ArrayAttrEditor;
    //
    //             let ret = {
    //                 id: itemId,
    //                 text: itemInstance.getTitle(),
    //                 state: "opened",
    //                 obj: obj[item.attrName], // array
    //                 children: obj[item.attrName].map((_item: any, index: number)=> {
    //                     //_item[parentArray]=obj[item.attrName];
    //                     return this.createTreeData();
    //                 }, this),
    //                 arrayAttrEditor: item
    //             };
    //             if (obj[item.attrName][myId])
    //                 ret.id = obj[item.attrName][myId];
    //
    //             return ret;
    //         }, this),
    //         designerFormat: designerFormat
    //     };
    //     if (obj[myId])
    //         root.id = obj[myId];
    //
    //     return root;
    // }


    treeNodeFormatter = (node: ITreeNode)=> {

        let childCount: React.ReactElement<any> | null = null;
        if (node.children)
            childCount =<span style={{color:"gray",fontSize:11}}> ({node.children.length})</span>;

        let style: React.CSSProperties = {
            fontWeight: "normal"
        }

        if (node.children && node.state!.startsWith("open"))
            style.fontWeight = "bold";

        let html = renderToStaticHtml(
            <span>
               <span style={style}>
                 {node.obj.name}
               </span>
               {childCount}
            </span>
        );

        return html;

    };

    refreshTreeNode = (node: ITreeNode)=> {
        node.text = this.treeNodeFormatter(node);
        this.easyTree("update", node);
    };


    componentDidMount() {

        let treeOptions = {
            //  data: здесь не заполнять !!!

            formatter: this.treeNodeFormatter,

            onExpand: (node: ITreeNode)=> {
                this.refreshTreeNode(node);
            },

            onCollapse: (node: ITreeNode)=> {
                this.refreshTreeNode(node);
            },

            onSelect: (node: any)=> {
                this.selectedObject = node.obj;
                this.tabsInstance.setEditedObject(this.selectedObject);
            },
            // onContextMenu: (e: any, node: any) => {
            //     e.preventDefault();
            //     this.easyTree("select", node.target);
            //
            //     let menuEl = $("#context-menu") as any;
            //     menuEl.empty();
            //
            //     if (node.arrayAttrEditor && node.arrayAttrEditor.actions) {
            //         node.arrayAttrEditor.actions.forEach((act: IAction)=> {
            //             menuEl.menu("appendItem", {
            //                 text: act.text,
            //                 iconCls: act.iconCls,
            //                 onclick: () => {
            //                     if (act.onClick) {
            //                         let parentNode = this.easyTree("getParent", node.target);
            //                         let newObject = act.onClick(parentNode!.obj);
            //                         if (newObject)
            //                             newObject[myId] = getRandomString();
            //                         this.reloadTree(newObject[myId]);
            //
            //                     }
            //                 }
            //             });
            //
            //         }, this);
            //     }
            //
            //     if (node.designerFormat && node.designerFormat.actions) {
            //         node.designerFormat.actions.forEach((act: IAction)=> {
            //             menuEl.menu("appendItem", {
            //                 text: act.text,
            //                 iconCls: act.iconCls,
            //                 onclick: () => {
            //                     if (act.onClick) {
            //                         let parentNode = this.easyTree("getParent", node.target);
            //                         let newObject = act.onClick(parentNode!.obj);
            //                         if (newObject) {
            //                             newObject[myId] = getRandomString();
            //                             this.reloadTree(newObject[myId]);
            //                         }
            //                         else
            //                             this.reloadTree();
            //                     }
            //                 }
            //             });
            //
            //         }, this);
            //     }
            //
            //     if (menuEl.children().length > 0) {
            //         menuEl.menu("show", {
            //             left: e.pageX,
            //             top: e.pageY
            //         });
            //     }
            // }
        };

        window.setTimeout(()=> {
            this.easyTree(treeOptions);
            this.createTreeData(1)
                .then(()=> {
                    this.easyTree("loadData", this.nodes);
                })
                .catch((err: any)=> {
                    throw err;
                })
        }, 1);


    };

    renderTree(): JSX.Element {
        console.log("renderTree()");
        return <div ref={(e)=>{this.treeContainer=e; console.log(e);}}></div>;
    }

    nodes: ITreeNode[];

    async createTreeData(autoExpandNodesToLevel?: number): Promise<void> {

        this.nodes = [];
        let nodeList: any = {};

        let objs = await (await getSchemaObjectCollection()).find().toArray();

        objs.forEach((dataSourceItem: ISchemaObject, index: number) => {
            let node: ITreeNode = {
                sourceIndex: index,
                key: dataSourceItem._id!,
                text: dataSourceItem.name,
                parentKey: dataSourceItem.parentObjectId,
                obj: dataSourceItem

            };
            nodeList[node.key] = node;
        }, this);

        for (let key in nodeList) {
            let node = nodeList[key] as ITreeNode;
            if (node.parentKey !== undefined) {
                let parentNode = nodeList[node.parentKey];
                if (parentNode !== undefined) {
                    if (node.parent)
                        throw "internal error";
                    node.parent = parentNode;
                    if (!parentNode.children)
                        parentNode.children = [];
                    parentNode.children.push(node);
                }
            }
        }

        for (let key in nodeList) {
            let node = nodeList[key] as ITreeNode;
            if (!node.parentKey || node.parentKey === null) {
                this.nodes.push(node);
            }
        }

        // сортировка children и проставление level
        let sortNodes = (nodes?: ITreeNode[]): ITreeNode[] | undefined => {
            if (!nodes || nodes.length === 0)
                return undefined;
            else
                return nodes.sort((a: ITreeNode, b: ITreeNode) => {
                    let aa = a.obj.position || a.sourceIndex;
                    let bb = b.obj.position || b.sourceIndex;
                    return compareNumbers(aa, bb);
                });
        };

        let processNode = (node: ITreeNode, level: number) => {
            node.level = level;

            let expanded = autoExpandNodesToLevel !== undefined && node.level < autoExpandNodesToLevel;
            if (expanded)
                node.state = "opened";
            else
                node.state = "closed";


            node.children = sortNodes(node.children);
            if (node.children) {
                node.children.forEach((node: ITreeNode) => {
                    processNode(node, level + 1);
                }, this);
            }
            else
                node.state = undefined;
        };

        this.nodes.forEach((node: ITreeNode) => {
            processNode(node, 0);
        }, this);

        this.nodes = sortNodes(this.nodes)!;
    }

}


