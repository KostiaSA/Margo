export let objectClasses: { [className: string]: Function;} = {};

export function registerClass(_class: Function) {
    let className = (_class as any).getClassName();
    if (objectClasses[className] !== undefined)
        throw `class "${className}" is already registered`;

    if (!(_class as any).getClassName)
        throw `error registering class "${className}", static function "getClassName" is not defined`;


    objectClasses[className] = _class;
    console.log(`register class "${className}"`);
}
