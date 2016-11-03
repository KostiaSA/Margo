import {AttrEditor} from "./AttrEditor";
import {IPersistentObject, PersistentObject} from "../../schema/SchemaObject";
import {getObjectOf} from "../../utils/getObjectOf";
import {getObjectInstanceOfType} from "../../utils/getObjectInstanceOfType";
import {getObjectHandlerOf} from "../../utils/getObjectHandlerOf";
import {getObjectOfClassName} from "../../utils/getObjectOfClassName";
import {IAttrEditor, IAttrFormatter, IEasyPropertyGridRow} from "../ObjectPropertyEditor";

export interface ISchemaObjectLookupItem {
    _id: string;
    text: string;
}

export interface ISchemaObjectAttrEditor extends IAttrEditor {
    getLookupList(): Promise<ISchemaObjectLookupItem[]>;
}

export class SchemaObjectAttrEditor extends AttrEditor<ISchemaObjectAttrEditor> {

    static getClassName(): string {
        return "buhta.SchemaObjectAttrEditor";
    }

    static createNew(): ISchemaObjectAttrEditor {
        return {
            _class: this.getClassName(),
        } as ISchemaObjectAttrEditor;
    }

    getEasyEditor(editedObj: IPersistentObject): any {
        //return "combobox";
        //let value = getObjectOf(editedObj[this.edt.attrName);
        //console.log("value=", value, this.edt.getObjectClassesList());

        return {
            type: "combobox",
            options: {
                limitToList: true,
                loader: (param: any, success: (data: any[])=>{}, error: ()=>{})=> {

                    this.edt.getLookupList()
                        .then((list: ISchemaObjectLookupItem[])=> {
                            success(list.map((item: ISchemaObjectLookupItem)=> {
                                return {value: item._id, text: item.text};
                            }))
                        })
                        .catch(()=> {
                            error();
                        })
                    //
                    //
                    // success(this.edt.getLookupList().map((item: {_id: string, text: string})=> {
                    //     return {value: item._id, text: item.text};
                    // }))

                }

            }
        };
    }

//     getFormatter(): IAttrFormatter {
//         let formatter = super.getFormatter();
// //         if (!formatter) {
// //             formatter = (value: any, row: IEasyPropertyGridRow)=> {
// // //                console.log("eee",row.valueObj);
// //                 return (getObjectHandlerOf(row.valueObj) as any).getClassTitle();
// //             };
// //         }
//         return formatter;
//     }


    getIsNeedReloadPropertyEditor(): boolean {
        return true;
    }


}