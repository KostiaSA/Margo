import {AttrEditor} from "./AttrEditor";
import {IPersistentObject, PersistentObject} from "../../schema/SchemaObject";
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
                // data: this.edt.getObjectClassesList().map((item: Function)=> {
                //
                //     let title = (item as any).getClassTitle();
                //     let instance = (item as any).getClassName();
                //
                //     return {value: instance, text: title};
                // }),
                loader: (param: any, success: (data: any[])=>{}, error: ()=>{})=> {
                    success(this.edt.getObjectClassesList().map((item: Function)=> {

                        let title = (item as any).getClassTitle();
                        let instance = (item as any).getClassName();

                        return {value: instance, text: title};
                    }))

                }
            }
        };
    }

    getFormatter(): IAttrFormatter {
        let formatter = super.getFormatter();
        if (!formatter) {
            formatter = (value: any, row: IEasyPropertyGridRow)=> {
//                console.log("eee",row.valueObj);
                return (getObjectHandlerOf(row.valueObj) as any).getClassTitle();
            };
        }
        return formatter;
    }

    getAttrValue(editedObj: IPersistentObject): any {
        return (getObjectHandlerOf(editedObj[this.edt.attrName]) as any).getClassName();
    }

    setAttrValue(editedObj: IPersistentObject, value: string /* _class */, row: IEasyPropertyGridRow) {

        let oldObj = editedObj[this.edt.attrName];
        let newObj = getObjectOfClassName(value);

        if (oldObj._class === newObj._class) {
            // при смене объекта мы копируем из старого все свойства, имена которых есть дизайнере нового
            let newObjInstance = getObjectOf<PersistentObject<IPersistentObject>>(newObj);
            let newObjDesignerFormat = newObjInstance.getDesignerFormat();

            newObjDesignerFormat.attributes.forEach((item: IAttrEditor)=> {
                if (oldObj[item.attrName] !== undefined)
                    newObj[item.attrName] = oldObj[item.attrName];
            }, this);
        }
        editedObj[this.edt.attrName] = newObj;
    }

    getIsNeedReloadPropertyEditor(): boolean {
        return true;
    }


}