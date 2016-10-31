import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {ObjectDesigner, IObjectDesignerProps} from "../designer/ObjectDesigner";
import {ISqlTable, SqlTable} from "../schema/SqlTable/SqlTable";


export class TestPage1 extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    render(): JSX.Element {


        let table= SqlTable.createNew();

        let designerProps: IObjectDesignerProps = {
            editedObject: table
        };

        return (
            <Layout _class="Layout" fit={true} panels={[
                            {_class:"LayoutPanel", title:"дизайнер объекта", region:"west",split:true, width:550, content:<ObjectDesigner {...designerProps}></ObjectDesigner>},
                            {_class:"LayoutPanel", title:"center", region:"center",content:<div>44444444444444</div>},
            ]}/>
        )


    }

}


