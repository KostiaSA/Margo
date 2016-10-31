import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SplitPane from 'react-split-pane';
import {TreeList} from "../component/TreeList/TreeList";
import {TreeListTestDataSource} from "../component/TreeList/TreeListTestDataSource";
import {app} from "./App";
import {IAppTab, AppTab} from "./AppTab";
import {getRandomString} from "../utils/getRandomString";
import {executeSql} from "../sql/MsSqlDb";
import {Tabs} from "../ui/Tabs";


export class MainPage3 extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }


    componentDidMount() {
        app.mainPage = this;

    };


    render(): JSX.Element {


        return (
            <div>
                main page 3
                <Tabs></Tabs>
            </div>
        )


    }


}


