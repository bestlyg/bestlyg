/** 读取缺失 key 时自动生成并写入默认值的 Map。 */
export class DefaultMap<K, V> extends Map<K, V> {
    constructor(
        private getDefaultData: (key?: K) => V = () => undefined as V,
        ...args: ConstructorParameters<typeof Map<K, V>>
    ) {
        super(...args);
    }

    /** 更新默认值工厂，之后访问缺失 key 会使用新的工厂函数。 */
    setDefault(v: DefaultMap<K, V>['getDefaultData']) {
        this.getDefaultData = v;
        return this;
    }

    /** 读取 key；如果不存在，会先通过默认值工厂创建并缓存。 */
    get(key: K) {
        if (!super.has(key) && this.getDefaultData) super.set(key, this.getDefaultData(key));
        return super.get(key)!;
    }
}
