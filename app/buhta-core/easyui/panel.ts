import {IPersistentObject} from "../schema/SchemaObject";

export interface IEasyBasePanel  extends  IPersistentObject{
    id?: string;
    title?: string;
    iconCls?: string;
    width?: number;
    height?: number;
    left?: number;
    top?: number;
    cls?: string;
    headerCls?: string;
    bodyCls?: string;
    style?: any;
    fit?: boolean;
    doSize?: boolean;
    noheader?: boolean;
    content?: React.ReactElement<any>;
    collapsible?: boolean;
    minimizable?: boolean;
    maximizable?: boolean;
    closable?: boolean;
    tools?: any[];
    //header	?:selector
    //footer	?:selector
    openAnimation?: "slide"|"fade"|"show";
    closeAnimation?: "slide"|"fade"|"hide";
    closeDuration?: number;
    collapsed?: boolean;
    minimized?: boolean;
    maximized?: boolean;
    closed?: boolean;
    //href?:	string
    //cache?:	boolean
    //loadingMessage?:	string
    //extractor?:	function
    //method?:	string
    //queryParams ?:object
    //loader	?:function

    onBeforeLoad?: (param?: any)=>boolean;
    onLoad?: ()=>void;
    onLoadError?: ()=>void;
    onBeforeOpen?: ()=>void;
    onOpen?: ()=>void;
    onBeforeDestroy?: ()=>void;
    onDestroy?: ()=>void;
    onBeforeCollapse?: ()=>void;
    onCollapse?: ()=>void;
    onBeforeExpand?: ()=>void;
    onExpand?: ()=>void;
    onResize?: (width?: number, height?: number)=>void;
    onMove?: (left?: number, top?: number)=>void;
    onMaximize?: ()=>void;
    onRestore?: ()=>void;
    onMinimize?: ()=>void;
}

export interface IEasyPanel extends IEasyBasePanel{
    border?: boolean;
    onBeforeClose?: ()=>void;
    onClose?: ()=>void;
}
