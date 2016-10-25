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
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    static?: boolean;
    isDraggable?:boolean;
    isResizable?:boolean;
    moved?:boolean;

}

export interface IPersistentLayoutProps extends IPersistentComponentProps {
    layout?: IItemLayout[];
    cols?: number;
    rowHeight?: number;
    width?: number;
    components?: IPersistentComponentProps[];
}

export class PersistentLayout extends PersistentComponent<IPersistentLayoutProps> {

    layout: IItemLayout[];

    private componentWillMount = () => {
        this.layout = this.props.layout || [{i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
                {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 14},
                {i: 'c', x: 4, y: 0, w: 1, h: 2}];
    };


    private componentWillReceiveProps = (nextProps: IPersistentLayoutProps) => {

    };

    onLayoutChange = (layout: IItemLayout[])=> {
        this.layout=layout;
        console.log(layout);
    };

    render() {
        return (
            <ReactGridLayout className="layout"
                             style={{ border:"1px solid green"}}
                             layout={this.layout}
                             cols={this.props.cols || 12}
                             rowHeight={this.props.rowHeight || 30}
                             width={this.props.width || 800}
                             onLayoutChange={this.onLayoutChange}>
                <div style={{ border:"1px solid red"}} key={'a'}>asssssss</div>
                <div style={{ border:"1px solid blue"}} key={'b'}>b</div>
                <div style={{ border:"1px solid black"}} key={'c'}>c</div>
            </ReactGridLayout>

        )
    }
}
