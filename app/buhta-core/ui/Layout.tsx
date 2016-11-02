import * as React from "react";
import * as ReactDOM from "react-dom";
import {setTimeout} from "timers";
import {IPersistentObject} from "../schema/SchemaObject";


export interface  ILayoutPanel extends IPersistentObject{
    region: "center" | "north" | "west" | "south" | "east";
    title?: string;
    width?: number;
    split?: boolean;
    height?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    content: React.ReactElement<any>;
}

export interface  ILayoutProps extends IPersistentObject{
    width?: number;
    height?: number;
    fit?: boolean;
    fitToBody?: boolean;
    panels: ILayoutPanel[];
}

export class Layout extends React.Component<ILayoutProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    layoutContainer: any;
    layoutInstance: any;

    componentDidUpdate() {
        //console.log("componentDidUpdate()");
    }

    forceUpdateNorth(content:any){
        ReactDOM.render(content, this.layoutInstance.layout("panel", "north")[0]);
    }
    forceUpdateSouth(content:any){
        ReactDOM.render(content, this.layoutInstance.layout("panel", "south")[0]);
    }
    forceUpdateWest(content:any){
        ReactDOM.render(content, this.layoutInstance.layout("panel", "west")[0]);
    }
    forceUpdateEast(content:any){
        ReactDOM.render(content, this.layoutInstance.layout("panel", "east")[0]);
    }
    forceUpdateCenter(content:any){
        ReactDOM.render(content, this.layoutInstance.layout("panel", "center")[0]);
    }

    componentDidMount() {

        let layoutOptions = {
            fit: this.props.fit,
            width: this.props.width,
            height: this.props.height,
        };

        window.setTimeout(()=> {
            if (this.props.fitToBody)
                this.layoutContainer = document.body;

            this.layoutInstance = ($(this.layoutContainer) as any).layout(layoutOptions);
            this.props.panels.forEach((item: ILayoutPanel)=> {
                this.layoutInstance.layout('add', {
                    region: item.region,
                    title: item.title,
                    width: item.width,
                    height: item.height,
                    split: item.split,
                    minWidth: item.minWidth,
                    minHeight: item.minHeight,
                    maxWidth: item.maxWidth,
                    maxHeight: item.maxHeight,
                });
                ReactDOM.render(item.content, this.layoutInstance.layout("panel", item.region)[0]);
            });
        }, 1);

        // this.layoutInstance.layout('add', {
        //     region: 'west',
        //     width: 180,
        //     title: 'West Title',
        //     split: true,
        //     collapsedContent:"жопа",
        //     tools: [{
        //         iconCls: 'icon-add',
        //         handler: this.hanler1
        //     }, {
        //         iconCls: 'icon-remove',
        //         handler: function () {
        //             alert('remove')
        //         }
        //     }]
        // });

        // ReactDOM.render(this.renderWest(), this.layoutInstance.layout('panel', 'west')[0]);
        // ReactDOM.render(this.renderWest(), this.layoutInstance.layout('panel', 'center')[0]);

    };


    render(): JSX.Element {

        return (
            <div ref={(e)=>this.layoutContainer=e}></div>
        )

    }


}


