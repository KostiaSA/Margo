import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";

export interface IAction extends IPersistentObject {
    text: string;
    iconCls?: string;
    onClick?: (parentObj?:any[])=>any;  // в случае, когда action создает новый объект или ищет объект, его надо вернуть
}

export class Action extends PersistentObject<IAction> {

    static getClassName(): string {
        return "buhta.Action";
    }

    static createNew(): IAction {
        return {
            _class: this.getClassName(),
            text: "action?"
        } as IAction;
    }

}
