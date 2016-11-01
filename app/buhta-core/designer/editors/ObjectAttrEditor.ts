import {AttrEditor} from "./AttrEditor";
import {IPersistentObject} from "../../schema/SchemaObject";
import {getObjectOf} from "../../utils/getObjectOf";
import {getObjectInstanceOfType} from "../../utils/getObjectInstanceOfType";
import {getObjectHandlerOf} from "../../utils/getObjectHandlerOf";
import {getObjectOfClassName} from "../../utils/getObjectOfClassName";
import {IAttrEditor, IAttrFormatter, IEasyPropertyGridRow} from "../ObjectPropertyEditor";

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

    getFormatter(): IAttrFormatter {
        let formatter = super.getFormatter();
        if (!formatter) {
            formatter = (value: any, row: IEasyPropertyGridRow)=> {
//                console.log("eee",row.valueObj);
                return (getObjectHandlerOf(row.valueObj) as any).getClassTitle();;
            };
        }
        return formatter;
    }

    getAttrValue(editedObj: IPersistentObject): any {
        return (getObjectHandlerOf(editedObj[this.edt.attrName]) as any).getClassTitle();
    }

    setAttrValue(editedObj: IPersistentObject, value: any, row: IEasyPropertyGridRow) {
        editedObj[this.edt.attrName] = getObjectOfClassName(value);
        row.valueObj = editedObj[this.edt.attrName];
    }

    getIsNeedReloadPropertyEditor(): boolean {
        return true;
    }


}