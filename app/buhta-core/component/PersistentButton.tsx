import * as React from "react";
import * as ReactDOM from "react-dom";
import {GridLayout2} from "./GridLayout2";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";

let ReactGridLayout = require('react-grid-layout');

export interface IPersistentButtonProps extends IPersistentComponentProps{
    text?:string;
}

export class PersistentButton extends PersistentComponent<IPersistentButtonProps> {

    render() {
        return (
            <button>
                {this.props.text}
            </button>
        )
    }
}
