import {objectClasses} from "../objectClasses";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {getObjectInstanceOfType} from "./getObjectInstanceOfType";

export function getObjectHandlerOf<T extends PersistentObject<IPersistentObject>>(obj: IPersistentObject): Function {
    let objHandler = objectClasses[obj._class];
    if (!objHandler)
        throw `object class "${obj._class}" is not registered`;
    return objHandler;
}