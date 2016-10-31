import * as React from "react";
import * as ReactDOM from "react-dom";
import {Layout} from "../ui/Layout";
import {ObjectDesigner, IObjectDesignerProps} from "../designer/ObjectDesigner";
import {ISqlTable, SqlTable} from "../schema/SqlTable/SqlTable";
import {SqlTableColumn} from "../schema/SqlTable/SqlTableColumn";
import {SchemaObject} from "../schema/SchemaObject";
import {SqlStringDataType} from "../schema/SqlTable/SqlStringDataType";
import {SqlDataType} from "../schema/SqlTable/SqlDataType";


export class TestPage1 extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    render(): JSX.Element {

      //   console.log("прото1", SqlStringDataType.prototype instanceof SqlDataType);


        let table= SqlTable.createNew();
        let col=SqlTableColumn.createNew();
        col.name="Номер";
        let col2=SqlTableColumn.createNew();
        col2.name="Название";
        table.columns.push(col);
        table.columns.push(col2);

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


