import {objectClasses} from "../objectClasses";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {getObjectInstanceOfType} from "./getObjectInstanceOfType";

export function getObjectOfClassName<T extends IPersistentObject>(_class: string): T {

    let objHandler = objectClasses[_class];
    if (!objHandler)
        throw `object class "${_class}" is not registered`;

    let objInstance = (objHandler as any).createNew();

    return objInstance;

}