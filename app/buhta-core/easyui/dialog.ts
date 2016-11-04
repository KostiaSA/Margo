import {IEasyWindow} from "./window";
import {IEasyLinkButtonProps} from "./linkbutton";

export  interface IEasyDialog extends IEasyWindow{
    toolbar?:IEasyLinkButtonProps[];
    buttons?:IEasyLinkButtonProps[];
}