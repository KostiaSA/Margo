import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject, PersistentObject, ISchemaObject} from "../schema/SchemaObject";
import {getObjectInstanceOfType} from "../utils/getObjectInstanceOfType";
import {IArrayAttrEditor, ArrayAttrEditor} from "./editors/ArrayAttrEditor";
import {IAction} from "./Action";
import {getRandomString} from "../utils/getRandomString";
import {objectClasses} from "../objectClasses";
import {IEasyTreeNode} from "../easyui/tree";
import {getSchemaObjectCollection} from "../schema/getSchemaObjectCollection";

export interface ISchemaDesignerProps {
    //  editedObject: IPersistentObject;
}


let myId = Symbol();

interface ITreeNode extends IEasyTreeNode {
    key: string;
    parentKey?: string;
    obj: ISchemaObject;
    sourceIndex: number;
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


    componentDidMount() {

        let treeOptions = {
            //  data: здесь не заполнять !!!
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
            this.createTreeData()
                .then(()=> {
                    this.easyTree("loadData", this.nodes);
                })
                .catch((err:any)=>{
                    throw err;
                })
        }, 1);



    };

    renderTree(): JSX.Element {
        console.log("renderTree()");
        return <div ref={(e)=>{this.treeContainer=e; console.log(e);}}></div>;
    }

    nodes: ITreeNode[];

    async createTreeData(): Promise<void> {

        this.nodes = [];
        let nodeList: any = {};

        // if (this.params.keyFieldName === undefined)
        //     throwError("GridTreeDataSourceFromArray: property 'keyFieldName' is undefined");
        //
        // if (this.params.parentKeyFieldName === undefined)
        //     throwError("GridTreeDataSourceFromArray: property 'parentKeyFieldName' is undefined");
        //

        let objs = await (await getSchemaObjectCollection()).find().toArray();

        objs.forEach((dataSourceItem: ISchemaObject, index: number) => {
            let node: ITreeNode = {
                sourceIndex: index,
                key: dataSourceItem._id!,
                text: dataSourceItem.name,
                parentKey: dataSourceItem.parentObjectId,
                obj: dataSourceItem

            };
            this.nodes.push(node);
            //dataSourceItem.$$dataSourceTreeNode = node;
            nodeList[node.key] = node;
            //node.sourceIndex = index;
            //node.key = dataSourceItem[this.params.keyFieldName!];

            //if (node.key === undefined)
            //  throwError("GridTreeDataSourceFromArray: key column '" + this.params.keyFieldName + "' not found");

            //if (node.key !== null && node.key.toString)
            //  node.key = node.key.toString();

            //node.parentKey = dataSourceItem[this.params.parentKeyFieldName!];
            //if (node.parentKey === undefined)
            //  throwError("GridTreeDataSourceFromArray: parent key column '" + this.params.parentKeyFieldName + "' not found");

            //if (node.parentKey !== null && node.parentKey.toString)
            //  node.parentKey = node.parentKey.toString();


        }, this);

       // console.log(this.nodes);
        //
        // for (let key in this.nodeList) {
        //     let node = this.nodeList[key];
        //     if (node.parentKey !== undefined) {
        //         let parentNode = this.nodeList[node.parentKey];
        //         if (parentNode !== undefined) {
        //             if ((node  as InternalTreeNode).parent !== undefined)
        //                 throwError("GridTreeDataSourceFromArray: internal error");
        //             (node  as InternalTreeNode).parent = parentNode;
        //             (parentNode as InternalTreeNode).children.push(node);
        //         }
        //     }
        // }
        //
        // for (let key in this.nodeList) {
        //     let node = this.nodeList[key];
        //     if (node.parentKey === null) {
        //         this.nodes.push(node);
        //     }
        // }
        //
        // // сортировка children и проставление level
        // let sortNodes = (nodes: InternalTreeNode[]): InternalTreeNode[] => {
        //     if (this.params.positionFieldName !== undefined) {
        //         return nodes.sort((a: InternalTreeNode, b: InternalTreeNode) => {
        //
        //             let aa = this.arrayObj[a.sourceIndex][this.params.positionFieldName!];
        //             if (aa === undefined)
        //                 throwError("GridTreeDataSourceFromArray: position column '" + this.params.positionFieldName + "' not found");
        //             if (!_.isNumber(aa))
        //                 throwError("GridTreeDataSourceFromArray: position column '" + this.params.positionFieldName + "' must be a number");
        //
        //             let bb = this.arrayObj[b.sourceIndex][this.params.positionFieldName!];
        //             if (bb === undefined)
        //                 throwError("GridTreeDataSourceFromArray: position column '" + this.params.positionFieldName + "' not found");
        //             if (!_.isNumber(bb))
        //                 throwError("GridTreeDataSourceFromArray: position column '" + this.params.positionFieldName + "' must be a number");
        //
        //             return numberCompare(aa, bb);
        //         });
        //     }
        //     else {
        //         return nodes.sort((a: InternalTreeNode, b: InternalTreeNode) => numberCompare(a.sourceIndex, b.sourceIndex));
        //     }
        // };
        //
        //
        // let processNode = (node: InternalTreeNode, level: number) => {
        //     node.level = level;
        //     node.expanded = this.params.autoExpandNodesToLevel !== undefined && node.level < this.params.autoExpandNodesToLevel;
        //     node.children = sortNodes(node.children);
        //     node.children.forEach((node: InternalTreeNode) => {
        //         processNode(node, level + 1);
        //     }, this);
        // };
        //
        // this.nodes.forEach((node: InternalTreeNode) => {
        //     processNode(node, 0);
        // }, this);
        //
        // this.nodes = sortNodes(this.nodes);
        // //this.state.nodes = this.state.nodes.sort((a, b) => numberCompare(a.sourceIndex, b.sourceIndex));

    }

}


