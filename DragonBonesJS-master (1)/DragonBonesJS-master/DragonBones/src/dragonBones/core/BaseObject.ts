namespace dragonBones {
    /**
     * @language zh_CN
     * 基础对象。
     * @version DragonBones 4.5
     */
    export abstract class BaseObject {
        private static _hashCode: number = 0;
        private static _defaultMaxCount: number = 5000;
        private static _maxCountMap: Map<number> = {};
        private static _poolsMap: Map<Array<BaseObject>> = {};

        private static _returnObject(object: BaseObject): void {
            const classType = String(object.constructor);
            const maxCount = BaseObject._maxCountMap[classType] == null ? BaseObject._defaultMaxCount : BaseObject._maxCountMap[classType];
            const pool = BaseObject._poolsMap[classType] = BaseObject._poolsMap[classType] || [];

            if (pool.length < maxCount) {
                //console.assert(pool.indexOf(object) < 0);
                pool.push(object);
            }
        }
        /**
         * @language zh_CN
         * 设置每种对象池的最大缓存数量。
         * @param objectConstructor 对象类。
         * @param maxCount 最大缓存数量。 (设置为 0 则不缓存)
         * @version DragonBones 4.5
         */
        public static setMaxCount(objectConstructor: typeof BaseObject, maxCount: number): void {
            if (maxCount < 0 || maxCount !== maxCount) {
                maxCount = 0;
            }

            if (objectConstructor) {
                const classType = String(objectConstructor);

                BaseObject._maxCountMap[classType] = maxCount;

                const pool = BaseObject._poolsMap[classType];
                if (pool && pool.length > maxCount) {
                    pool.length = maxCount;
                }
            }
            else {
                BaseObject._defaultMaxCount = maxCount;

                for (let classType in BaseObject._poolsMap) {
                    if (BaseObject._maxCountMap[classType] == null) {
                        continue;
                    }

                    BaseObject._maxCountMap[classType] = maxCount;

                    const pool = BaseObject._poolsMap[classType];
                    if (pool.length > maxCount) {
                        pool.length = maxCount;
                    }
                }
            }
        }
        /**
         * @language zh_CN
         * 清除对象池缓存的对象。
         * @param objectConstructor 对象类。 (不设置则清除所有缓存)
         * @version DragonBones 4.5
         */
        public static clearPool(objectConstructor: typeof BaseObject = null): void {
            if (objectConstructor) {
                const pool = BaseObject._poolsMap[String(objectConstructor)];
                if (pool && pool.length) {
                    pool.length = 0;
                }
            }
            else {
                for (let k in BaseObject._poolsMap) {
                    const pool = BaseObject._poolsMap[k];
                    pool.length = 0;
                }
            }
        }
        /**
         * @language zh_CN
         * 从对象池中创建指定对象。
         * @param objectConstructor 对象类。
         * @version DragonBones 4.5
         */
        public static borrowObject<T extends BaseObject>(objectConstructor: { new (): T; }): T {
            const pool = BaseObject._poolsMap[String(objectConstructor)];
            if (pool && pool.length > 0) {
                return <T>pool.pop();
            }
            else {
                const object = new objectConstructor();
                object._onClear();
                return object;
            }
        }
        /**
         * @language zh_CN
         * 对象的唯一标识。
         * @version DragonBones 4.5
         */
        public hashCode: number = BaseObject._hashCode++;
        /**
         * @internal
         * @private
         */
        public constructor() { }
        /**
         * @private
         */
        protected abstract _onClear(): void;
        /**
         * @language zh_CN
         * 清除数据并返还对象池。
         * @version DragonBones 4.5
         */
        public returnToPool(): void {
            this._onClear();
            BaseObject._returnObject(this);
        }
    }
}