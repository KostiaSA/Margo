import * as React from "react";
import * as SplitPane from 'react-split-pane';
import {TreeList} from "../component/TreeList/TreeList";
import {TreeListTestDataSource} from "../component/TreeList/TreeListTestDataSource";
import {app} from "./App";
import {IAppTab, AppTab} from "./AppTab";


export class MainPage2 extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    splitterContainer: any;
    splitterInstance: any;

    tabContainer: any;
    tabInstance: ej.Tab;

    tabs: AppTab[] = [];

    openTab(tab: IAppTab): AppTab {
        let newTab = new AppTab(tab);
        this.tabInstance.addItem("xxxx","xxxx-tab",undefined);
        this.tabs.push(newTab);
        return newTab;
    }


    componentDidMount() {
        app.mainPage = this;

        var splitterInstance = new ej.Splitter($(this.splitterContainer), {
            height: "100%",
            width: "100%",
            orientation: ej.Orientation.Horizontal,
            properties: [{collapsible: false, expandable: false}, {collapsible: false, expandable: false}],
            isResponsive: true
        });

        var tabInstance = new ej.Tab($(this.tabContainer),{
            width: "500px",
            collapsible: true,
            events: "click",
            heightAdjustMode: ej.Tab.HeightAdjustMode.Content,
            showCloseButton: true,
            showRoundedCorner: false
        });

    }

    render(): JSX.Element {


        let bodyStyle = {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            border: "1px solid red"
            //width:"100%"
        }

        let headerStyle = {
            flex: "0 0 auto",
            border: "1px solid green",

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }

        let contentStyle = {
            display: "flex",
            flexDirection: "row",
            flex: "1 1 auto",
            border: "1px solid green",
            //overflowY: "auto",
            positon: "relative"

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }

        let navStyle = {
            flex: "0 0 auto",
            border: "1px solid gray",
            overflow: "auto",
            maxWidth: 150,

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }
        let pageStyle = {
            flex: "1 1 auto",
            border: "1px solid gray",
            overflow: "auto",
            backgroundColor: "white"
//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }

        let footerStyle = {
            flex: "0 0 auto",
            border: "1px solid green",

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }


        return (
            <div style={bodyStyle}>
                <div style={headerStyle}>
                    Это заголоок бля!
                </div>
                <div ref={(e)=>this.splitterContainer=e}>
                    <div>
                        то page бля! Это page бля! Это page бля! Это
                    </div>
                    <div>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        <div ref={(e)=>this.tabContainer=e} style={{width: 500}}>
                            <ul>
                                <li><a href="#steelman">Man of Steel</a></li>
                                <li><a href="#woldwar">World War Z</a></li>
                            </ul>
                            <div id="steelman">
                                steelman
                            </div>
                            <div id="woldwar">
                                steelman
                            </div>
                        </div>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                    </div>
                </div>
                <div style={footerStyle}>
                    Это footer бля!<br/>
                    Это footer бля!
                </div>

            </div>
        )

    }


}


