// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import * as _ from "lodash";
// import ReactChild = React.ReactChild;
//
// let w = window as any;
// w.$ = w.jQuery = require('jquery')
// require("jqueryui");
//
// require("syncfusion-javascript/Scripts/ej/web/ej.web.all.min.js");
//
// let ej = (window as any).ej;
//
// //require("jquery.fancytree/dist/jquery.fancytree-all");
//
// console.log(ej);
//
// export interface IDialogProps extends React.HTMLAttributes<Element> {
//
// }
//
// export class Dialog extends React.Component<IDialogProps, any> {
//
//     $dialog: any;
//     treeApi: any;
//
//     componentDidMount() {
//         // var dialogInstance = new ej.Dialog($(this.$dialog), {
//         //     width: 550,
//         //     minWidth: 310,
//         //     minHeight: 215,
//         //     target: ".control",
//         //     //close:()=&gt;{this.onDialogClose()}
//         //
//         // });
//
//         var basicButton = new ej.Button($(this.$dialog), {
//             //size: "mini",
//             showRoundedCorner: true,
//             contentType: "textandimage",
//             prefixIcon: "e-icon e-save",
//             text: "Save Уроды",
//             height:100
//
//         });
//
//         console.log(basicButton);
//
// //         w.$(this.$fancyTree).fancytree(
// //             {
// //                 toggleEffect: false,
// // //                extensions: ["edit", "bopContextMenu", "dnd"],
// //                 extensions: ["edit", "dnd"],
// //                 source: this.props.dataSource.getNodes(),
// //                 //contextMenu: {onClick: this.props.onContextMenuClick},
// //                 activate: () => {
// //                     //const tree = $fancyTree.fancytree('getTree');
// //                     //this.props.onSelected(tree.getActiveNode());
// //                 },
// //                 edit: {
// //                     // beforeClose: (event, data) => {
// //                     //     if(data.save){
// //                     //         this.props.onRename(data.node, data.input.val());
// //                     //     }
// //                     // }
// //                 },
// //                 dblclick: () => {
// //                     //const node = $fancyTree.fancytree('getTree').getActiveNode();
// //                     //this.props.onDoubleClick(node);
// //                 },
// //                 dnd: {
// //                     autoExpandMS: 400,
// //                     focusOnClick: true,
// //                     preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
// //                     preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
// //                     //dragStart: this.props.onDragStart,
// //                     //dragEnter: this.props.onDragEnter,
// //                     //dragDrop: this.props.onDragDrop
// //                 },
// //                 renderNode: (event: any, data: any)=> {
// //                     if (!_.isString(data.node.title))
// //                         ReactDOM.render(data.node.title, data.node.span.getElementsByClassName("fancytree-title")[0]);
// //                 }
// //             });
// //
// //         this.treeApi = w.$(this.$fancyTree).fancytree("getTree");
// //
// //         //console.log(api, api.count());
// //
// //         //api.reload();
//
//     }
//
//     componentWillUnmount() {
// //        this.$fancyTree.fancytree('destroy');
//     }
//
//     render() {
//
//         return (
//
//             <div style={this.props.style} className="tree-view">
//                 это dialog
//                 <div className="dialog" ref={(e)=>this.$dialog=e}></div>
//             </div>
//
//         )
//     }
// }
