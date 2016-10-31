import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {IPersistentObject} from "../schema/SchemaObject";
import {ObjectPropertEditor} from "./ObjectPropertyEditor";

export interface IObjectDesignerProps {
    editedObject: IPersistentObject;
}

export class ObjectDesigner extends React.Component<IObjectDesignerProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    renderPropertyEditor(): JSX.Element {
        return <ObjectPropertEditor editedObject={this.props.editedObject}></ObjectPropertEditor>;
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
        let root = [{
            "id": 1,
            "text": this.props.editedObject._class,
            "state": "opened",
        }];
        return root;
    }


    componentDidMount() {

        let treeOptions = {
            data:this.createTreeData()
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


