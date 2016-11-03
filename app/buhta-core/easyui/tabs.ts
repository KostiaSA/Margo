import {IEasyBasePanel} from "./panel";

export interface IEasyTabs extends IEasyBasePanel {
    plain?: boolean;
    scrollIncrement?: number;
    scrollDuration?: number;
    tools?: any[];
    toolPosition?: string;
    tabPosition?: string;
    headerWidth?: number;
    tabWidth?: number;
    tabHeight?: number;
    selected?: number;
    showHeader?: boolean;
    justified?: boolean;
    narrow?: boolean;
    pill?: boolean;

    //onLoad:	panel;
    onSelect?: (title: string, index: number)=>void;
    onUnselect?: (title: string, index: number)=>void;
    onBeforeClose?: (title: string, index: number)=>void;
    onClose?: (title: string, index: number)=>void;
    onAdd?: (title: string, index: number)=>void;
    onUpdate?: (title: string, index: number)=>void;
    onContextMenu?: (e: any, title: string, index: number)=>void;
}

export interface IEasyTabsPanel {
    id?: string;
    title?: string;
    content?: string;
    href?: string;
    cache?: boolean;
    iconCls?: string;
    width?: number;
    height?: number;
    border?:boolean;
    collapsible?: boolean;
    closable?: boolean;
    selected?: boolean;
    disabled?: boolean;
}