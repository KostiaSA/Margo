import isDate = require("lodash/isDate");
import isString = require("lodash/isString");

//let ret3 = String.fromCharCode(13) + String.fromCharCode(10) + "\n" + String.fromCharCode(10) + "\n" + String.fromCharCode(10);

export function cloneSqlToMongo(sql: any): any {
    let mongo: any = {};
    for (let key in sql) {
        let sqlValue = sql[key];
        if (sqlValue === 0) continue;
        if (sqlValue === false) continue;
        if (sqlValue === "") continue;

        if (sqlValue === undefined) continue;
        if (sqlValue === null) continue;
        //if (sqlValue === ret3) continue;
        if (sqlValue.toString().length === 6 && sqlValue.toString()[0] === String.fromCharCode(13)) continue;
        if (isDate(sqlValue) && sqlValue.getFullYear() < 1950) continue;

        if (key.indexOf("ип субко") !== -1 && sqlValue === "Нет") continue;
        if (key.indexOf("Тип по") !== -1 && sqlValue === "Нет") continue;

        // if (isString(sqlValue)) {
        //     console.log(sqlValue);
        //     console.log(sqlValue.charCodeAt(0));
        //     console.log(sqlValue.charCodeAt(1));
        //     console.log(sqlValue.charCodeAt(2));
        // }
        mongo[normalizeKey(key)] = sqlValue;
    }
    return mongo;
}

function normalizeKey(key: string): string {
    let ret = "";
    for (var i = 0, len = key.length; i < len; i++) {
        let char = key[i];
        if (char === " ")
            ret += "_";
        else if (char === ".")
            ret += "_";
        else if (char === "-")
            ret += "_";
        else
            ret += char;

    }
    return ret;
}