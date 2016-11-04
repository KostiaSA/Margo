import * as React from "react";


export class TestDialogContent extends React.Component<any, any> {

    container: any;


    componentDidMount() {

    }

    componentDidUpdate() {

    }

    xxx:string="XXX";

    render() {
        return (
            <div onClick={()=>{this.xxx="YYY";this.forceUpdate()}}>test content :{this.xxx}</div>
        )
    }
}
