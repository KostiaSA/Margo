import * as React from "react";
import {AttrEditor} from "./AttrEditor";
import {IPersistentObject, PersistentObject} from "../../schema/SchemaObject";
import {IAttrEditor, IAttrFormatter, IEasyPropertyGridRow} from "../ObjectPropertyEditor";
import {getRandomString} from "../../utils/getRandomString";
import {renderToStaticHtml} from "../../utils/renderToStaticHtml";
import {getSchema} from "../../schema/Schema";

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

    getFormatter(): IAttrFormatter {
//         let formatter = super.getFormatter();
// //         if (!formatter) {
// //             formatter = (value: any, row: IEasyPropertyGridRow)=> {
// // //                console.log("eee",row.valueObj);
// //                 return (getObjectHandlerOf(row.valueObj) as any).getClassTitle();
// //             };
// //         }
        return (value: any, row: IEasyPropertyGridRow)=> {
            let divId="a"+getRandomString();
          //  console.log("forma", row);

            if (!value)
                return "<нет значения>";
            else {
                getSchema().getObjectName(value)
                    .then((name:string)=>{
                       $("#"+divId).html(renderToStaticHtml(<div id={divId}>{name}</div>));
                    })
                    .catch((error:any)=>{
                        $("#"+divId).html(renderToStaticHtml(<div id={divId}>{"<ошибка>"}</div>));

                    });

                return renderToStaticHtml(<div id={divId}>...</div>);
            }
        };
    }


    getIsNeedReloadPropertyEditor(): boolean {
        return true;
    }


}