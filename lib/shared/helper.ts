export function isPromise(p: any) {
    return p instanceof Promise || Promise.resolve(p) === p;
}

export function getMetaDataKey(prefix: string) {
    return (functionName: string) => `${prefix}_${functionName}`;
}
