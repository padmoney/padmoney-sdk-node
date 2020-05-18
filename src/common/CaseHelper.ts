interface Generic {
    [key: string]: any
}

function parseKey(key: string, revert: boolean = false): string {
    return revert
        ? key.replace(/(_\w)/g, v => v[1].toUpperCase())
        : key.replace(/([^A-Z][A-Z0-9])/g, v => `${v[0]}_${v[1].toLowerCase()}`)
}

function parseObject(object: Generic | Generic[], revert: boolean = false): any {
    if (!object || 'object' !== typeof object) {
        return object
    }
    if (Array.isArray(object)) {
        return object.map(obj => parseObject(obj, revert))
    }
    if (object.constructor !== {}.constructor) {
        return object
    }

    const parsedObj = {} as Generic;
    for (const key in object) {
        parsedObj[parseKey(key, revert)] = parseObject(object[key], revert)
    }
    return parsedObj
}

class CaseHelper {
    public toSnakeCase(obj: any): any {
        return parseObject(obj)
    }

    public toCamelCase(obj: any): any {
        return parseObject(obj, true)
    }
}

export default new CaseHelper();
