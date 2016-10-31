
export function getObjectInstanceOfType(type: Function, constructorArgsArray?: any[]) {
    return new (Function.prototype.bind.apply(type, [this].concat(constructorArgsArray)));
}
