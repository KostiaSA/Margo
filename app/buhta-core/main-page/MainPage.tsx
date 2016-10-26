import * as React from "react";
import * as SplitPane from 'react-split-pane';

export class MainPage extends React.Component<any,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
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
            positon:"relative"

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }

        let navStyle = {
            flex: "0 0 auto",
            border: "1px solid gray",
            overflow:"auto"

//            padding: "0 20px",
//            borderBottom: "1px solid #e5e5e5"
        }
        let pageStyle = {
            flex: "1 1 auto",
            border: "1px solid gray",
            overflow:"auto",
            backgroundColor:"white"
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
                <div style={contentStyle}>
                    <div style={navStyle}>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                        Это навигатор бля!<br/>
                    </div>
                    <div style={pageStyle}>
                        Этоxpagexбля!xЭтоxpagexбля!xЭтоxpagexбля!xЭтоxpagexбля!xЭтоxpagexбля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                        Это page бля! Это page бля! Это page бля! Это page бля! Это page бля!<br/>
                    </div>

                    {/*<SplitPane split="vertical" defaultSize={300}>*/}
                        {/*<div style={{backgroundColor:"white", height:"100%"}}>*/}
                            {/*Pane 3331<br/>*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}
                        {/*</div>*/}
                        {/*<div style={{backgroundColor:"white"}}>*/}
                            {/*Pane33333 2*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 332222231<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}
                            {/*Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>*/}

                        {/*</div>*/}
                    {/*</SplitPane>*/}

                </div>
                <div style={footerStyle}>
                    Это footer бля!<br/>
                    Это footer бля!
                </div>

            </div>
        )

        // return (
        //     <div style={bodyStyle}>
        //         <header style={headerStyle}>
        //             <h1>React Splitter Layout</h1>
        //             <p>A split layout for React and modern browsers.</p>
        //         </header>
        //         <div style={{flex:"1 1 auto"}}>
        //             <SplitPane split="vertical" defaultSize={300}>
        //                 <div style={{backgroundColor:"white"}}>Pane 3331<br/>
        //                     Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>
        //                     Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>
        //                     Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>Pane 3331<br/>
        //                 </div>
        //                 <div style={{backgroundColor:"white"}}>Pane33333 2</div>
        //             </SplitPane>
        //         </div>
        //     </div>
        // );
    }


}


