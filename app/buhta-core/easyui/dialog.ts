import {IEasyWindow} from "./window";

export  interface IEasyDialog extends IEasyWindow{
    toolbar?:React.ReactElement<any>;
    buttons?:React.ReactElement<any>;
}