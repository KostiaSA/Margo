import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject} from "../schema/SchemaObject";
import {ObjectPropertEditor} from "./ObjectPropertyEditor";
import {SqlTableColumn} from "../schema/SqlTable/SqlTableColumn";

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

    renderPropertyEditor(): JSX.Element {
        return <ObjectPropertEditor ref={(e)=>this.propertyEditorInstance=e}
                                    editedObject={this.selectedObject}></ObjectPropertEditor>;
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
    treeInstance: any;
    peContainer: any;
    peInstance: any;

    createTreeData(): any[] {
        let fakeTable = SqlTableColumn.createNew();

        let root = [{
            "id": 1,
            "text": this.props.editedObject._class,
            "state": "opened",
            "obj": this.props.editedObject
        }, {
            "id": 2,
            "text": fakeTable._class,
            "state": "opened",
            "obj": fakeTable
        }];
        return root;
    }


    componentDidMount() {

        let treeOptions = {
            data: this.createTreeData(),
            onSelect: (node: any)=> {
                this.selectedObject = node.obj;
                this.propertyEditorInstance.setEditedObject(this.selectedObject);
            }
            // data: [{
            //     "id": 1,
            //     "text": "Node 1",
            //     "state": "closed",
            //     "children": [{
            //         "id": 11,
            //         "text": "Node 11"
            //     }, {
            //         "id": 12,
            //         "text": "Node 12"
            //     }]
            // }, {
            //     "id": 2,
            //     "text": "Node 2",
            //     "state": "closed"
            // }]
        };

        window.setTimeout(()=> {
            this.treeInstance = ($(this.treeContainer) as any).tree(treeOptions);
        }, 1);

    };

    renderTree(): JSX.Element {
        return <div ref={(e)=>this.treeContainer=e}></div>;
    }

}


