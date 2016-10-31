import {getFunctionName} from "./utils/getFunctionName";
export let objectClasses: { [className: string]: Function;} = {};

export function registerClass(_class: Function) {
    let className = (_class as any).getClassName();
    if (objectClasses[className] !== undefined)
        throw `class "${className}" is already registered`;

    if (!(_class as any).getClassName)
        throw `error registering class "${className}", static function "getClassName" is not defined`;


    objectClasses[className] = _class;
   // console.log(`register class "${className}"`);
}


// export function isClassInheritsFrom(_class: Function, _parentClass: Function): boolean {
//     if (!(_class as any).getClassName)
//         throw `class "${getFunctionName(_class)}" has no static function "getClassName"`;
//     if (!(_parentClass as any).getClassName)
//         throw `class "${getFunctionName(_parentClass)}" has no static function "getParentClassName"`;
//
//     let className = (_class as any).getClassName();
//     let parentClassName = (_parentClass as any).getClassName();
//
//     if (className === parentClassName)
//         return true
//     else if (!(_class as any).getParentClassName)
//         return false;
//     else {
//         let classParentName = (_class as any).getParentClassName();
//         if (classParentName === parentClassName)
//             return true
//         else
//             return isClassInheritsFrom(objectClasses[classParentName], _parentClass)
//     }
// }
//
