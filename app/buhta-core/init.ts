import {registerClass} from "./objectClasses";
import {SqlTable} from "./schema/SqlTable/SqlTable";
import {SqlTableColumn} from "./schema/SqlTable/SqlTableColumn";
import {SqlStringDataType} from "./schema/SqlTable/SqlStringDataType";
import {StringAttrEditor} from "./designer/editors/StringAttrEditor";
import {DateTimeAttrEditor} from "./designer/editors/DateTimeAttrEditor";

export function init(){
    registerClass(SqlTable);
    registerClass(SqlTableColumn);
    registerClass(SqlStringDataType);

    registerClass(StringAttrEditor);
    registerClass(DateTimeAttrEditor);
}