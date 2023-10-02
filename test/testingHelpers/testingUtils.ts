export const createDeepCopy = <T>(object: T): T => {
    const deepCopy: T = JSON.parse(JSON.stringify(object));
    return deepCopy;
};