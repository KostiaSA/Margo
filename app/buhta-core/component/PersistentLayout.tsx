import * as React from "react";
import * as ReactDOM from "react-dom";
import {GridLayout2} from "./GridLayout2";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";

let ReactGridLayout = require('react-grid-layout');

export interface IItemLayout {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    static: boolean;
}

export interface IPersistentLayoutProps extends IPersistentComponentProps {
    layout?: IItemLayout[];
    cols?: number;
    rowHeight?: number;
    width?: number;
    components?: IPersistentComponentProps[];
}

export class PersistentLayout extends PersistentComponent<IPersistentLayoutProps> {

    render() {
        return (
            <ReactGridLayout className="layout"
                             style={{ border:"1px solid green"}}
                             layout={this.props.layout || []}
                             cols={this.props.cols || 12}
                             rowHeight={this.props.rowHeight || 30}
                             width={this.props.width || 800}>
                <div style={{ border:"1px solid red"}} key={'a'}>asssssss</div>
                <div style={{ border:"1px solid blue"}} key={'b'}>b</div>
                <div style={{ border:"1px solid black"}} key={'c'}>c</div>
            </ReactGridLayout>

        )
    }
}
