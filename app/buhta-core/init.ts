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
import {test_create_new_schema_app} from "../test_create_new_schema_app";
import {SchemaApp} from "./schema/SchemaApp/SchemaApp";
import {SchemaFolder} from "./schema/SchemaFolder/SchemaFolder";

export function init(){
    registerClass(SchemaApp);

    registerClass(SchemaFolder);

    registerClass(SqlTable);
    registerClass(SqlTableColumn);
    registerClass(SqlStringDataType);
    registerClass(SqlIntDataType);

    registerClass(StringAttrEditor);
    registerClass(DateTimeAttrEditor);
    registerClass(ArrayAttrEditor);
    registerClass(ObjectAttrEditor);
}

let x= convertSchemas;
let y=test_create_new_schema_app;