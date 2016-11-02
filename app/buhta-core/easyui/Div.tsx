import * as React from "react";
import {getRandomString} from "../utils/getRandomString";

export class Div extends React.Component<any, any> {

    render() {
        console.log("render my Div");
        return (
            <div {...this.props}>{getRandomString()}{this.props.children}</div>
        )
    }
}
