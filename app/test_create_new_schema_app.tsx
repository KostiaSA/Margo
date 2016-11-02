import {getSchemaObjectCollection} from "./buhta-core/schema/getSchemaObjectCollection";
import {SchemaApp} from "./buhta-core/schema/SchemaApp/SchemaApp";
import {SchemaFolder} from "./buhta-core/schema/SchemaFolder/SchemaFolder";
import {SqlTable} from "./buhta-core/schema/SqlTable/SqlTable";
import {SqlTableColumn} from "./buhta-core/schema/SqlTable/SqlTableColumn";
import {SqlStringDataType} from "./buhta-core/schema/SqlTable/SqlStringDataType";

export async function test_create_new_schema_app() {
    try {
        let so = await getSchemaObjectCollection();
        await so.drop();

        let app = SchemaApp.createNew();
        so.insertOne(app);

        let folder = SchemaFolder.createNew();
        folder.name = "таблицы";
        folder.parentObjectId = app._id;
        so.insertOne(folder);


        let table = SqlTable.createNew();
        table.parentObjectId = folder._id;
        table.name="Организация";

        let col = SqlTableColumn.createNew();
        col.name = "номер";
        col.description = "номер организации";
        let dataType = SqlStringDataType.createNew();
        dataType.maxLen = 10;
        col.dataType = dataType;

        table.columns.push(col);
        col = SqlTableColumn.createNew();
        col.name = "название";
        col.description = "название организации";
        col.dataType = SqlStringDataType.createNew();
        table.columns.push(col);
        so.insertOne(table);


        folder = SchemaFolder.createNew();
        folder.name = "запросы";
        folder.parentObjectId = app._id;
        so.insertOne(folder);

    }
    catch (e) {
        console.error(e)
    }
}

(window as any).test_create_new_schema_app = test_create_new_schema_app;