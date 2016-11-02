import * as React from "react";

export interface IEasyLinkButtonProps {
    width?: number;
    height?: number;
    id?: string;
    disabled?: boolean;
    toggle?: boolean;
    selected?: boolean;
    group?: string;
    plain?: boolean;
    text?: string;
    iconCls?: string;
    iconAlign?: string;
    size?: 'small' | 'large';
    onPress?: ()=>void;
}

export class EasyLinkButton extends React.Component<IEasyLinkButtonProps, any> {

    container: any;

    easy = (arg1: any, arg2?: any): any=> {
        return ($(this.container) as any).linkbutton(arg1, arg2);
    }

    componentDidMount() {
        window.setTimeout(()=> {
            this.easy(this.props);
        }, 1);
    }

    componentDidUpdate() {
        window.setTimeout(()=> {
            this.easy(this.props);
        }, 1);
    }

    render() {
        return (
            <a href="#" ref={(e)=>this.container=e} onClick={()=>{if (this.props.onPress) this.props.onPress()}}></a>
        )
    }
}
