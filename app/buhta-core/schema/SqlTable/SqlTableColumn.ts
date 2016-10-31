import {IPersistentObject, PersistentObject} from "../SchemaObject";
import {ISqlDataType, SqlDataType} from "./SqlDataType";
import {IObjectDesignerFormat} from "../../designer/ObjectDesignerFormat";
import {StringAttrEditor} from "../../designer/editors/StringAttrEditor";
import {ObjectAttrEditor, IObjectAttrEditor} from "../../designer/editors/ObjectAttrEditor";
import {objectClasses} from "../../objectClasses";
import {getClassesInheritsFrom} from "../../utils/getClassesInheritsFrom";
import {SqlStringDataType} from "./SqlStringDataType";
import {getObjectOf} from "../../utils/getObjectOf";

export interface ISqlTableColumn extends IPersistentObject {
    name: string;
    dataType: ISqlDataType;
    description?: string;
    notNull?: boolean;
    //primaryKey: boolean;
}

export class SqlTableColumn extends PersistentObject<ISqlTableColumn> {
    static getClassName(): string {
        return "buhta.SqlTableColumn";
    }

    // static gestParentClassName():string{
    //     return "buhta.PersistentObject";
    // }

    static createNew(): ISqlTableColumn {
        return {
            _class: this.getClassName(),
            name: "НоваяКолонка",
            dataType: SqlStringDataType.createNew()
        } as ISqlTableColumn;
    }

    getDesignerFormat(): IObjectDesignerFormat {
        let ret = super.getDesignerFormat();
        ret.attributes.push({attrName: "name", title: "имя колонки", _class: StringAttrEditor.getClassName()});
        ret.attributes.push({attrName: "description", title: "описание", _class: StringAttrEditor.getClassName()});

        let sqlTypeEditor: IObjectAttrEditor = {
            attrName: "dataType",
            title: "тип данных",
            _class: ObjectAttrEditor.getClassName(),
            getObjectClassesList: (): Function[] => {
                return getClassesInheritsFrom(SqlDataType);
            }
        };

        //console.log("keus778", sqlTypeEditor.getObjectClassesList());

        ret.attributes.push(sqlTypeEditor);

        ret.getTitle = (obj: ISqlTableColumn)=> {
            return obj.name + ":  " + getObjectOf<SqlTableColumn>(obj.dataType).toString();
        };
        return ret;
    }

    validate(errors: string[]) {
        let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";

        this.obj.name = this.obj.name.trim();

        if (this.obj.name.length === 0)
            errors.push(errTitle + "'имя колонки' не может быть пустым");

        if (this.obj.name.startsWith("$$"))
            errors.push(errTitle + "'имя колонки' не может начинаться с $$");

    }
}


