import {IAttrEditor, AttrEditor} from "./AttrEditor";
import {IPersistentObject} from "../../schema/SchemaObject";
import {getObjectOf} from "../../utils/getObjectOf";
import {getObjectInstanceOfType} from "../../utils/getObjectInstanceOfType";
import {getObjectHandlerOf} from "../../utils/getObjectHandlerOf";
import {getObjectOfClassName} from "../../utils/getObjectOfClassName";

export interface IObjectAttrEditor extends IAttrEditor {
    getObjectClassesList(): Function[];
}

export class ObjectAttrEditor extends AttrEditor<IObjectAttrEditor> {

    static getClassName(): string {
        return "buhta.ObjectAttrEditor";
    }

    // static getParentClassName():string{
    //     return "buhta.AttrEditor";
    // }

    static createNew(): IAttrEditor {
        return {
            _class: this.getClassName(),
        } as IAttrEditor;
    }

    getEasyEditor(editedObj: IPersistentObject): any {
        //return "combobox";
        //let value = getObjectOf(editedObj[this.edt.attrName);
        //console.log("value=", value, this.edt.getObjectClassesList());

        return {
            type: "combobox",
            options: {
                limitToList: true,
                data: this.edt.getObjectClassesList().map((item: Function)=> {

                    let title = (item as any).getClassTitle();
                    let instance = (item as any).getClassName();

                    return {value: instance, text: title};
                })
            }
        };
    }

    getAttrValue(editedObj: IPersistentObject): any {
        return getObjectOf(editedObj[this.edt.attrName]).toString();
    }

    setAttrValue(editedObj: IPersistentObject, value: any) {
        editedObj[this.edt.attrName] = getObjectOfClassName(value);
    }

}