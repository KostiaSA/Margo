import * as React from "react";
import * as classNames from "classnames";

import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";

let ReactGridLayout = require('react-grid-layout');

export interface IPersistentItemDesignToolbarProps {
    items?: IPersistentItemDesignToolItemProps[];
}

export class PersistentItemDesignToolbar extends React.Component<IPersistentItemDesignToolbarProps, any> {

    renderItems(): JSX.Element[] {
        if (this.props.items === undefined)
            return [];
        else
            return this.props.items.map((item: IPersistentItemDesignToolItemProps, index:number)=> {
                return <PersistentItemDesignToolItem {...item} key={index}></PersistentItemDesignToolItem>
            });
    }

    render() {
        return (
            <div style={{ border:"0px solid silver", position:"absolute", height:14, top:0, left:0, width:"100%"}}>
                {this.renderItems()}
                {this.props.children}
            </div>
        )
    }
}


export interface IPersistentItemDesignToolItemProps {
    iconClass?: string;
    isPullRight?: boolean;
    isDrag?: boolean;
    onClick?: React.MouseEventHandler<any>;
}

export class PersistentItemDesignToolItem extends React.Component<IPersistentItemDesignToolItemProps, any> {

    onClick = (e: any)=> {
        alert("1");
        if (this.props.onClick)
            this.props.onClick(e);
    };

    render() {
        let cls = classNames(this.props.iconClass, {
            "is-pulled-right": this.props.isPullRight,
            "drag-me": this.props.isDrag
        });
        return (
            <i className={cls} style={{fontSize:15, color:"sandybrown"}} onClick={this.onClick}></i>
        )
    }
}
