import {ISqlDataType, SqlDataTypeHandler} from "./SqlDataType";
import {PersistentObject} from "../SchemaObject";

export interface ISqlStringDataType extends ISqlDataType {
    maxLen: number;
}

export class SqlStringDataType extends SqlDataTypeHandler<ISqlStringDataType> {
    static getClassName(): string {
        return "buhta.SqlStringDataType";
    }

    static createNew(): ISqlStringDataType {
        return {
            _class: this.getClassName(),
            maxLen: 50
        } as ISqlStringDataType;
    }

    validate(errors: string[]) {
        // let errTitle = "Ошибка в колонке '" + this.obj.name + "': ";
        //
        // this.obj.name = this.obj.name.trim();
        //
        // if (this.obj.name.length === 0)
        //     errors.push(errTitle + "'имя колонки' не может быть пустым");
        //
        // if (this.obj.name.startsWith("_"))
        //     errors.push(errTitle + "'имя колонки' не может начинаться с _");

    }
}


