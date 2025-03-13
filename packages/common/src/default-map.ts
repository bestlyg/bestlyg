export class DefaultMap<K, V> extends Map<K, V> {
    constructor(private getDefaultData: (key?: K) => V = () => undefined as any) {
        super();
    }
    setDefault(v: DefaultMap<K, V>['getDefaultData']) {
        this.getDefaultData = v;
        return this;
    }
    get(key: K) {
        if (!super.has(key) && this.getDefaultData) super.set(key, this.getDefaultData(key));
        return super.get(key);
    }
}
