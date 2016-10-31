import * as React from "react";
import * as ReactDOM from "react-dom";


export interface  ITabsProps {
    width:number;
    height:number;
}

export class Tabs extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    componentDidMount() {
        //app.mainPage = this;

    };


    render(): JSX.Element {


        return (
            <div className="easyui-tabs tabs-container" style={{width:700,height:250}}>
                <div className="tabs-header" style={{width: 698}}>
                    <div className="tabs-scroller-left" style={{display: "none"}}></div>
                    <div className="tabs-scroller-right" style={{display: "none"}}></div>
                    <div className="tabs-wrap" style={{marginLeft: 0, marginRight: 0, width: 698}}>
                        <ul className="tabs" style={{height: 27}}>
                            <li className="tabs-first tabs-selected">
                                <a href="javascript:void(0)"
                                   className="tabs-inner"
                                   style={{height: 27, lineHeight: "25px"}}>
                                    <span className="tabs-title">About</span>
                                    <span className="tabs-icon">
                                </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="tabs-panels" style={{height: 219, width: 698}}>
                    <div className="panel" style={{display: "block", width: 698}}>
                        <div title="" style={{padding: 10, width: 698, height: 199}}
                             className="panel-body panel-body-noheader panel-body-noborder">
                            <p style={{fontSize:14}}>jQuery EasyUI framework helps you build your web pages easily.</p>
                            <ul>
                                <li>easyui is a collection of user-interface plugin based on jQuery.</li>
                                <li>
                                    easyui provides essential functionality for building modem, interactive, javascript applications.
                                </li>
                                <li>
                                    write many javascript code, you usually defines user-interface by writing some HTML markup.
                                </li>
                                <li>complete framework for HTML5 web page.</li>
                                <li>easyui save your time and scales while developing your products.</li>
                                <li>easyui is very easy but powerful.</li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )


    }


}


