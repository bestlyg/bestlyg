export class DefaultMap<K, V> extends Map<K, V> {
    constructor(
        private getDefaultData: (key?: K) => V = () => undefined as V,
        ...args: ConstructorParameters<typeof Map<K, V>>
    ) {
        super(...args);
    }
    setDefault(v: DefaultMap<K, V>['getDefaultData']) {
        this.getDefaultData = v;
        return this;
    }
    get(key: K) {
        if (!super.has(key) && this.getDefaultData) super.set(key, this.getDefaultData(key));
        return super.get(key)!;
    }
}
