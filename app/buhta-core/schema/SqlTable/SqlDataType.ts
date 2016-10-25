import {IPersistentObject, PersistentObject} from "../SchemaObject";

export interface ISqlDataType extends IPersistentObject {

}

export class SqlDataTypeHandler<T extends ISqlDataType> extends PersistentObject<T> {

    // validate(errors: string[]) {
    //     let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";
    //
    //     this.obj.name = this.obj.name.trim();
    //
    //     if (this.obj.name.length === 0)
    //         errors.push(errTitle + "'имя колонки' не может быть пустым");
    //
    //     if (this.obj.name.startsWith("_"))
    //         errors.push(errTitle + "'имя колонки' не может начинаться с _");
    //
    // }
}


