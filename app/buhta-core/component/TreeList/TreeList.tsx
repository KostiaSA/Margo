import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";
import {PersistentComponent, IPersistentComponentProps} from "../PersistentComponent";
import ReactChild = React.ReactChild;
import {PersistentItemDesignToolbar, PersistentItemDesignToolItem} from "../PersistentItemDesignToolbar";
import {ITreeListDataSource} from "./TreeListDataSource";

let w = window as any;
w.$ = w.jQuery = require('jquery')
require("jqueryui");
require("jquery.fancytree/dist/jquery.fancytree-all");

export interface ITreeListProps extends React.HTMLAttributes<Element> {
    dataSource: ITreeListDataSource<any>;
}

export class TreeList extends React.Component<ITreeListProps, any> {

    $fancyTree: any;
    treeApi: any;

    componentDidMount() {

        w.$(this.$fancyTree).fancytree(
            {
                toggleEffect: false,
//                extensions: ["edit", "bopContextMenu", "dnd"],
                extensions: ["edit", "dnd"],
                source: this.props.dataSource.getNodes(),
                //contextMenu: {onClick: this.props.onContextMenuClick},
                activate: () => {
                    //const tree = $fancyTree.fancytree('getTree');
                    //this.props.onSelected(tree.getActiveNode());
                },
                edit: {
                    // beforeClose: (event, data) => {
                    //     if(data.save){
                    //         this.props.onRename(data.node, data.input.val());
                    //     }
                    // }
                },
                dblclick: () => {
                    //const node = $fancyTree.fancytree('getTree').getActiveNode();
                    //this.props.onDoubleClick(node);
                },
                dnd: {
                    autoExpandMS: 400,
                    focusOnClick: true,
                    preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                    preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                    //dragStart: this.props.onDragStart,
                    //dragEnter: this.props.onDragEnter,
                    //dragDrop: this.props.onDragDrop
                },
                renderNode: (event: any, data: any)=> {
                    if (!_.isString(data.node.title))
                        ReactDOM.render(data.node.title, data.node.span.getElementsByClassName("fancytree-title")[0]);
                }
            });

        this.treeApi = w.$(this.$fancyTree).fancytree("getTree");

        //console.log(api, api.count());

        //api.reload();

    }

    componentWillUnmount() {
        this.$fancyTree.fancytree('destroy');
    }

    render() {

        return (

            <div style={this.props.style} className="tree-view">
                <div className="fancytree" ref={(e)=>this.$fancyTree=e}></div>
            </div>

        )
    }
}
