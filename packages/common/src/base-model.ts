export class BaseModel {
    set<K extends keyof this, V extends this[K]>(key: K, val: V) {
        this[key] = val;
        return this;
    }
    get<K extends keyof this>(key: K) {
        return this[key];
    }
}
