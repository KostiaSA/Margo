import {registerClass} from "./objectClasses";
import {SqlTable} from "./schema/SqlTable/SqlTable";
import {SqlTableColumn} from "./schema/SqlTable/SqlTableColumn";
import {SqlStringDataType} from "./schema/SqlTable/SqlStringDataType";
import {StringAttrEditor} from "./designer/editors/StringAttrEditor";
import {DateTimeAttrEditor} from "./designer/editors/DateTimeAttrEditor";
import {ArrayAttrEditor} from "./designer/editors/ArrayAttrEditor";
import {ObjectAttrEditor} from "./designer/editors/ObjectAttrEditor";
import {SqlIntDataType} from "./schema/SqlTable/SqlIntDataType";
import {convertSchemas} from "../test_convert_tmc_to_schemaobject";

export function init(){
    registerClass(SqlTable);
    registerClass(SqlTableColumn);
    registerClass(SqlStringDataType);
    registerClass(SqlIntDataType);

    registerClass(StringAttrEditor);
    registerClass(DateTimeAttrEditor);
    registerClass(ArrayAttrEditor);
    registerClass(ObjectAttrEditor);
}

let x= convertSchemas();