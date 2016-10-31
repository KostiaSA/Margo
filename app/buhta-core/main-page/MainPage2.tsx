import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SplitPane from 'react-split-pane';
import {TreeList} from "../component/TreeList/TreeList";
import {TreeListTestDataSource} from "../component/TreeList/TreeListTestDataSource";
import {app} from "./App";
import {IAppTab, AppTab} from "./AppTab";
import {getRandomString} from "../utils/getRandomString";
import {executeSql} from "../sql/MsSqlDb";
import {Layout} from "../ui/Layout";


export class MainPage2 extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    splitterContainer: any;
    splitterInstance: any;

    gridContainer: any;
    gridInstance: any;

    propEditorContainer: any;
    propEditorInstance: any;

    layoutContainer: any;
    layoutInstance: any;

    testSql() {

        executeSql("SELECT TOP 100 Номер,Название FROM ТМЦ");
    }

    async loadGrid(): Promise<void> {
        let res = await executeSql("SELECT TOP 500 Номер,Название, Вид FROM ТМЦ");
        this.gridInstance.datagrid("loadData", res[0]);
    }


    componentDidMount() {
        app.mainPage = this;


        let tabModel = {
            width: "700px",
            height: "200px",
            columns: [[
                {field: 'Номер', title: 'Номер', width: 100},
                {field: 'Название', title: 'Название', width: 300}
            ]]
        };

        this.gridInstance = ($(this.gridContainer) as any).datagrid(tabModel);

        this.gridInstance.datagrid('enableFilter', [{
            field: 'Номер',
            type: 'numberbox',
            options: {precision: 1},
            op: ['equal', 'notequal', 'less', 'greater']
        }, {
            field: 'Название',
            type: 'text',
            op: ['contains']
        }]);

        this.loadGrid();


        let propModel = {
            width: "350px",
            height: "200px",
            showGroup: true,
            scrollbarSize: 0
        };

        this.propEditorInstance = ($(this.propEditorContainer) as any).propertygrid(propModel);

        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName',
            value: '',
            group: 'Marketing Settings',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName1',
            value: '',
            group: 'Marketing Settings',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName2',
            value: '',
            group: 'Marketing',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName3',
            value: '',
            group: 'Marketing',
            editor: 'text'
        });

        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName',
            value: '',
            group: 'Marketing Settings',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName1',
            value: '',
            group: 'Marketing Settings',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName2',
            value: '',
            group: 'Marketing',
            editor: 'text'
        });
        this.propEditorInstance.propertygrid("appendRow", {
            name: 'AddName3',
            value: '',
            group: 'Marketing',
            editor: 'text'
        });


        let layModel = {
            width: "450px",
            height: "200px",
        };

        this.layoutInstance = ($(this.layoutContainer) as any).layout(layModel);
        this.layoutInstance.layout('add', {
            region: 'west',
            width: 180,
            title: 'West Title',
            split: true,
            collapsedContent: "жопа",
            tools: [{
                iconCls: 'icon-add',
                handler: this.hanler1
            }, {
                iconCls: 'icon-remove',
                handler: function () {
                    alert('remove')
                }
            }]
        });
        this.layoutInstance.layout('add', {
            region: 'center',
            title: 'Center',
        });

        ReactDOM.render(this.renderWest(), this.layoutInstance.layout('panel', 'west')[0]);
        ReactDOM.render(this.renderWest(), this.layoutInstance.layout('panel', 'center')[0]);

    };

    hanler1 = ()=> {
        console.log('add');
        console.log(this.westComp);
        ReactDOM.render(this.renderWest(), this.layoutInstance.layout('panel', 'west')[0]);
    }

    westComp: any;//React.Component<any,any>;

    renderWest(): JSX.Element {
        let westLabel = getRandomString();
        return <div ref={(e)=>{this.westComp = e}}>west!!! {westLabel}</div>
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
                    <div >
                        то page бля! Это page бля! Это page бля! Это
                        <button onClick={()=>{this.testSql()}}> test SQL</button>
                        <Layout _class="" height={300} width={300} panels={[
                            {_class:"" , title:"north", region:"west",split:true, width:150, content:<div>2222222</div>},
                            {_class:"", title:"center", region:"center",content:<div>44444444444444</div>},
                        ]}/>
                    </div>
                    <div>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        <div ref={(e)=>this.gridContainer=e}></div>
                        <div ref={(e)=>this.propEditorContainer=e}></div>
                        <div ref={(e)=>this.layoutContainer=e}></div>
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


