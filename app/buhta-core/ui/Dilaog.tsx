import * as React from "react";
import * as ReactDOM from "react-dom";
import {IEasyDialog} from "../easyui/dialog";
import {getDeepClone} from "../utils/getDeepClone";
import isDivisibleBy = require("validator/lib/isDivisibleBy");
import {getRandomString} from "../utils/getRandomString";
import {renderToStaticHtml} from "../utils/renderToStaticHtml";

export interface  IDialogProps extends IEasyDialog {
}

export class Dialog extends React.Component<IDialogProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    dialogContainer: any;
    dialogInstance: any;

    componentDidUpdate(prevProps: IDialogProps) {
        if (this.dialogInstance) {
            // if (prevProps.north && this.props.north && prevProps.north.content !== this.props.north.content) {
            //     ReactDOM.render(this.props.north.content!, this.DialogInstance.Dialog("panel", "north")[0]);
            // }
            // if (prevProps.south && this.props.south && prevProps.south.content !== this.props.south.content) {
            //     ReactDOM.render(this.props.south.content!, this.DialogInstance.Dialog("panel", "south")[0]);
            // }
            // if (prevProps.west && this.props.west && prevProps.west.content !== this.props.west.content) {
            //     ReactDOM.render(this.props.west.content!, this.DialogInstance.Dialog("panel", "west")[0]);
            // }
            // if (prevProps.east && this.props.east && prevProps.east.content !== this.props.east.content) {
            //     ReactDOM.render(this.props.east.content!, this.DialogInstance.Dialog("panel", "east")[0]);
            // }
            // if (prevProps.center && this.props.center && prevProps.center.content !== this.props.center.content) {
            //     ReactDOM.render(this.props.center.content!, this.DialogInstance.Dialog("panel", "center")[0]);
            // }
        }
    }

    dialogResult: any;

    handleOnClose = ()=> {
        if (this.props.onClose)
            this.props.onClose(this.dialogResult);
        this.easyDialog("destroy");
    };


    componentDidMount() {

        window.setTimeout(()=> {

            let contentId="a"+getRandomString();

            let dialogProps = getDeepClone<IDialogProps>(this.props) as any;
            dialogProps.content = renderToStaticHtml(<div id={contentId}></div>);
            dialogProps.onClose = this.handleOnClose;

            this.easyDialog(dialogProps);

            ReactDOM.render(this.props.content!, $("#"+contentId)[0]);

        }, 1);

    };

    easyDialog = (arg1: any, arg2?: any): any=> {
        return ($(this.dialogContainer) as any).dialog(arg1, arg2);
    };

    render(): JSX.Element {
        console.log("render Dialog", this.props);
        return (
            <div ref={(e)=>this.dialogContainer=e}></div>
        )

    }

}

export function showDialog<T>(param: IDialogProps): Promise<T> {

    return new Promise<T>(
        (resolve: (obj: T) => void, reject: (error: string) => void) => {

            let clonedParam = getDeepClone<IDialogProps>(param);

            param.onClose = (dialogResult: T)=> {
                if (clonedParam.onClose)
                    clonedParam.onClose(dialogResult);
                resolve(dialogResult);
            };

            ReactDOM.render(
                <Dialog {...param}/>,
                document.createElement("div")
            );


        });
}


