import * as React from "react";
import * as ReactDOM from "react-dom";
import {GridLayout2} from "./GridLayout2";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";
import {PersistentItemDesignToolbar, PersistentItemDesignToolItem} from "./PersistentItemDesignToolbar";
import {PersistentButton} from "./PersistentButton";

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
    isDraggable?: boolean;
    isResizable?: boolean;
    moved?: boolean;

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
        this.layout = layout;
        console.log(layout);
    };

    render() {
        return (
            <div style={{ position :"relative" , border:"1px solid green", overflow:"hidden" }}>
                <ReactGridLayout className="layout"

                                 layout={this.layout}
                                 cols={this.props.cols || 48}
                                 rowHeight={this.props.rowHeight || 10}
                                 width={this.props.width || 800}
                                 onLayoutChange={this.onLayoutChange}
                                 draggableHandle=".drag-me"
                >
                    <PersistentButton key={'a'} _class="buhta.PersistentButton">222asssssss</PersistentButton>
                    <div style={{ border:"1px solid blue"}} key={'b'}>b</div>
                    <div style={{ border:"1px solid black"}} key={'c'}>c</div>
                </ReactGridLayout>
                <PersistentItemDesignToolbar items={[
                    { iconClass: "fa fa-cog", isPullRight:true}
                ]}>
                    <PersistentItemDesignToolItem iconClass="fa fa-home"></PersistentItemDesignToolItem>
                </PersistentItemDesignToolbar>
            </div>

        )
    }
}
