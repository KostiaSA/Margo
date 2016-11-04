import {IEasyPanel, IEasyBasePanel} from "./panel";

export interface IEasyWindow extends IEasyBasePanel {
    title?: string;
    collapsible?: boolean;
    minimizable?: boolean;
    maximizable?: boolean;
    closable?: boolean;
    closed?: boolean;
    zIndex?: number;
    draggable?: boolean;
    resizable?: boolean;
    shadow?: boolean;
    inline?: boolean;
    modal?: boolean;
    border?: boolean | string;
    constrain?: boolean;
    onBeforeClose?: ()=>void;
    onClose?: (dialogResult:any)=>void;
}