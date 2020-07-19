/**
 * @author Echi
 * @desc 用于解决跨页面的数据存储在本地的问题,并设置有效期
 */

class Storage {
    private prefixKey = 'prefix_key_storage_';

    constructor(strategy = 'localStorage') {
        this['strategy'] = strategy;
    }

    /**
     * @param [string] key
     * @param [any] val
     * @param [number] maxAge 存储时间：s
     */
    set(key, val, maxAge = 0) {
        const data = {
            val,
            expires: maxAge === 0 ? 0 : Date.now() + (maxAge * 1000),
        };
        window[this['strategy']][this.prefixKey + key.toString()] = JSON.stringify(data);
    }

    get(key) {
        const data = window[this['strategy']][this.prefixKey + key.toString()] &&
            JSON.parse(window[this['strategy']][this.prefixKey + key.toString()]);

        if (data) {
            if (data.expires === 0) {
                return data.val;
            }

            if (Date.now() < data.expires) {
                return data.val;
            }

            this.remove(key);
            return null;
        }
        return null;
    }

    remove(key) {
        delete window[this['strategy']][this.prefixKey + key.toString()];
    }
}

export const local = new Storage('localStorage');
export const session = new Storage('sessionStorage');
