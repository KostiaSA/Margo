import {objectClasses} from "../objectClasses";
import {IPersistentObject, PersistentObject} from "../schema/SchemaObject";
import {getObjectInstanceOfType} from "./getObjectInstanceOfType";

export function getObjectOf<T extends PersistentObject<IPersistentObject>>(obj: IPersistentObject): T {

    let objHandler = objectClasses[obj._class];
    if (!objHandler)
        throw `object class "${obj._class}" is not registered`;

    let objInstance = getObjectInstanceOfType(objHandler, [obj]);

    return objInstance;

}