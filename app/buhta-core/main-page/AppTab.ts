
import * as React from "react";

export interface IAppTab {
    title:string;
    content:React.ReactNode;
}

export class AppTab {
    constructor (public props:IAppTab){

    }
}
