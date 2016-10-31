import {objectClasses} from "../objectClasses";

export function getClassesInheritsFrom(_class: Function): Function[] {
    return Object.keys(objectClasses).map((key: string)=> {
        return objectClasses[key];
    }).filter((item: Function)=> {
        return item.prototype instanceof _class;
    });
}
