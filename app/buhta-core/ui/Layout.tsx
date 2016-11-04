import * as React from "react";
import * as ReactDOM from "react-dom";
import {setTimeout} from "timers";
import {IPersistentObject} from "../schema/SchemaObject";
import {IEasyPanel, IEasyBasePanel} from "../easyui/panel";


export interface  ILayoutPanel extends IEasyBasePanel {
    //  region?: "center" | "north" | "west" | "south" | "east";
    border?: boolean;
    title?: string;
    width?: number;
    split?: boolean;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    content?: React.ReactElement<any>;
}

export interface  ILayoutProps extends IEasyPanel {
    width?: number;
    height?: number;
    fit?: boolean;
    fitToBody?: boolean;
    north?: ILayoutPanel;
    south?: ILayoutPanel;
    west?: ILayoutPanel;
    east?: ILayoutPanel;
    center?: ILayoutPanel;
    //panels: ILayoutPanel[];
}

export class Layout extends React.Component<ILayoutProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    layoutContainer: any;
    layoutInstance: any;

    componentDidUpdate(prevProps: ILayoutProps) {
        if (this.layoutInstance) {
            if (prevProps.north && this.props.north && prevProps.north.content !== this.props.north.content) {
                ReactDOM.render(this.props.north.content!, this.layoutInstance.layout("panel", "north")[0]);
            }
            if (prevProps.south && this.props.south && prevProps.south.content !== this.props.south.content) {
                ReactDOM.render(this.props.south.content!, this.layoutInstance.layout("panel", "south")[0]);
            }
            if (prevProps.west && this.props.west && prevProps.west.content !== this.props.west.content) {
                ReactDOM.render(this.props.west.content!, this.layoutInstance.layout("panel", "west")[0]);
            }
            if (prevProps.east && this.props.east && prevProps.east.content !== this.props.east.content) {
                ReactDOM.render(this.props.east.content!, this.layoutInstance.layout("panel", "east")[0]);
            }
            if (prevProps.center && this.props.center && prevProps.center.content !== this.props.center.content) {
                ReactDOM.render(this.props.center.content!, this.layoutInstance.layout("panel", "center")[0]);
            }
        }
    }

    forceUpdateNorth(content: any) {
        // if (this.layoutInstance)
        //     ReactDOM.render(content, this.layoutInstance.layout("panel", "north")[0]);
    }

    forceUpdateSouth(content: any) {
        if (this.layoutInstance)
            ReactDOM.render(content, this.layoutInstance.layout("panel", "south")[0]);
    }

    forceUpdateWest(content: any) {
        if (this.layoutInstance)
            ReactDOM.render(content, this.layoutInstance.layout("panel", "west")[0]);
    }

    forceUpdateEast(content: any) {
        if (this.layoutInstance)
            ReactDOM.render(content, this.layoutInstance.layout("panel", "east")[0]);
    }

    forceUpdateCenter(content: any) {
        if (this.layoutInstance)
            ReactDOM.render(content, this.layoutInstance.layout("panel", "center")[0]);
    }


    componentDidMount() {

        // let layoutOptions = {
        //     fit: this.props.fit,
        //     width: this.props.width,
        //     height: this.props.height,
        // };

        window.setTimeout(()=> {
            this.layoutInstance = ($(this.layoutContainer) as any).layout(this.props);

            if (this.props.fitToBody)
                this.layoutContainer = document.body;

            let renderPanel = (place: string)=> {
                let item = (this.props as any)[place] as ILayoutPanel;
                if (item) {
                    this.layoutInstance.layout('add', {

                        region: place,
                        border: item.border,
                        title: item.title,
                        width: item.width,
                        height: item.height,
                        split: item.split,
                        minWidth: item.minWidth,
                        minHeight: item.minHeight,
                        maxWidth: item.maxWidth,
                        maxHeight: item.maxHeight,
                    });
                    ReactDOM.render((this.props as any)[place]!.content!, this.layoutInstance.layout("panel", place)[0]);
                }
            }
            renderPanel("north");
            renderPanel("south");
            renderPanel("west");
            renderPanel("east");
            renderPanel("center");


        }, 1);

    };


    render(): JSX.Element {
        //console.log("render Layout");
        return (
            <div ref={(e)=>this.layoutContainer=e}></div>
        )

    }


}


