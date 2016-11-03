import * as React from "react";
import {getRandomString} from "../utils/getRandomString";
import {observer} from "mobx-react";

@observer
export class Div extends React.Component<any, any> {

    render() {
        console.log("render my Div");
        return (
            <div {...this.props}></div>
        )
    }
}
