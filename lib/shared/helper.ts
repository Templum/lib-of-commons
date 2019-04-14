export function isPromise(p: any) {
    return p instanceof Promise || Promise.resolve(p) === p;
}
