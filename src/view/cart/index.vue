<template>
  <div id="app" class="cart-box">
    <div class="cart-main">
      <div class="cart-card">
        <div class="cart-row">
          <img class="cart-img" :src="activeImg" />
          <div class="cart-info">
            <div class="cart-name">{{ dataSource.trade_name }}</div>
            <div class="cart-money">¥ {{ price }}</div>
            <div class="cart-stock" v-show="stock">库存 {{ stock }} 件</div>
          </div>
        </div>
      </div>
      <div class="cart-card">
        <div
          class="cart-card-container"
          v-for="sku in skuListMap.attrGroupList"
          :key="sku.attribute_id"
        >
          <div class="cart-card-title">{{sku.attribute_name}}</div>
          <div class="cart-card-box">
            <template v-for="tag in sku.valueList">
              <span
                :class="['cart-card-item', 
                    { 'active': activeKey[sku.attribute_id] === tag.attribute_value_id },
                    { 'disabled': disabledKey(tag.attribute_value_id) },
                  ]"
                :key="tag.attribute_value_id"
                @click="handleClick(sku, tag)"
              >{{tag.attribute_value}}</span>
            </template>
          </div>
        </div>
      </div>
      <div class="cart-card" v-show="validateCartStatus.status">
        <p>当前已选择：</p>
        <pre>{{JSON.stringify(validateCartStatus.item, null, 2)}}</pre>
      </div>
    </div>
    <div
      :class="['cart-footer', { 'disabled': !validateCartStatus.status}]"
      @click="handleAddToCart"
    >加入购物车</div>
  </div>
</template>

<script>
import DEFAULT_PNG from "@/assets/default.png";
import SKU_1_PNG from "@/assets/1.png";
import SKU_2_PNG from "@/assets/2.png";

export default {
  name: "Cart",
  data() {
    return {
      activeKey: {},
      cartNumber: 1,
      dataSource: {
        material_id: 70,
        trade_name:
          "Apple iPhone 11 (A2223) 128GB 黑色 移动联通电信4G手机 双卡双待",
        main_img: DEFAULT_PNG,
        sku_list: [
          {
            sku_id: 101,
            material_id: 70,
            sku_price: 179,
            main_img: SKU_1_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 143,
                attribute_value: "白色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 243,
                attribute_value: "32G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 343,
                attribute_value: "2019"
              }
            ],
            stock: 190
          },
          {
            sku_id: 102,
            material_id: 70,
            sku_price: 179,
            main_img: SKU_1_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 143,
                attribute_value: "白色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 243,
                attribute_value: "32G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 344,
                attribute_value: "2020"
              }
            ],
            stock: 190
          },
          {
            sku_id: 103,
            material_id: 70,
            sku_price: 179,
            main_img: SKU_1_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 143,
                attribute_value: "白色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 244,
                attribute_value: "64G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 343,
                attribute_value: "2019"
              }
            ],
            stock: 190
          },
          {
            sku_id: 106,
            material_id: 70,
            sku_price: 183,
            main_img: SKU_2_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 144,
                attribute_value: "红色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 243,
                attribute_value: "32G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 343,
                attribute_value: "2019"
              }
            ],
            stock: 223
          },
          {
            sku_id: 109,
            material_id: 70,
            sku_price: 183,
            main_img: SKU_2_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 144,
                attribute_value: "红色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 244,
                attribute_value: "64G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 344,
                attribute_value: "2020"
              }
            ],
            stock: 223
          },
          {
            sku_id: 107,
            material_id: 70,
            sku_price: 200,
            main_img: SKU_2_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 145,
                attribute_value: "蓝色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 243,
                attribute_value: "32G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 343,
                attribute_value: "2019"
              }
            ],
            stock: 223
          },
          {
            sku_id: 108,
            material_id: 70,
            sku_price: 200,
            main_img: SKU_2_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 145,
                attribute_value: "蓝色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 244,
                attribute_value: "64G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 343,
                attribute_value: "2019"
              }
            ],
            stock: 223
          },
          {
            sku_id: 109,
            material_id: 70,
            sku_price: 200,
            main_img: SKU_2_PNG,
            sku_prop: [
              {
                attribute_id: 58,
                attribute_name: "颜色",
                attribute_value_id: 145,
                attribute_value: "蓝色"
              },
              {
                attribute_id: 108,
                attribute_name: "内存",
                attribute_value_id: 244,
                attribute_value: "64G"
              },
              {
                attribute_id: 208,
                attribute_name: "上市年份",
                attribute_value_id: 344,
                attribute_value: "2020"
              }
            ],
            stock: 223
          }
        ]
      }
    };
  },
  computed: {
    activeImg() {
      const defaultImg = this.dataSource.main_img;
      const skuImg = this.validateCartStatus.item?.main_img;
      return skuImg || defaultImg;
    },
    price() {
      const sku_price = this.validateCartStatus.item?.sku_price;
      return sku_price || 0;
    },
    stock() {
      const stock = this.validateCartStatus.item?.stock;
      return stock || 0;
    },
    skuListMap() {
      const { sku_list } = this.dataSource;
      // 属性组数据
      const attributeGroupList = {};
      // 属性 sku_id 组
      const existSkuIdKey = {};
      // 同属性组
      const attrSameKey = {};
      (sku_list || []).forEach(list => {
        const { sku_prop } = list;
        // 获取属性组的 attribute_value_id，排序后用 | 分割
        const attrsIdKeys = (sku_prop || [])
          .map(item => item.attribute_value_id)
          .sort((a, b) => a - b)
          .join("|");

        existSkuIdKey[attrsIdKeys] = list;

        (sku_prop || []).forEach(prop => {
          const valueInfo = {
            attribute_value_id: prop.attribute_value_id,
            attribute_value: prop.attribute_value
          };
          const hasAttrId = attributeGroupList[prop.attribute_id];
          // 属性组里不存在则新增
          if (hasAttrId === undefined) {
            attributeGroupList[prop.attribute_id] = {
              ...prop,
              valueList: []
            };
            attrSameKey[prop.attribute_id] = [];
          }
          // 属性列表
          const existList = attributeGroupList[prop.attribute_id].valueList;
          // 判断 attribute_value_id 是否已存在属性组, 防止同一 attribute_value_id 多次添加
          const hasExistAttrId = existList.some(
            item => item.attribute_value_id === prop.attribute_value_id
          );
          if (!hasExistAttrId) {
            Array.prototype.push.call(
              attributeGroupList[prop.attribute_id].valueList,
              valueInfo
            );
            Array.prototype.push.call(
              attrSameKey[prop.attribute_id],
              prop.attribute_value_id
            );
          }
        });
      });

      const attrGroupList = Object.values(attributeGroupList);

      return {
        attrGroupList,
        existSkuIdKey,
        attrSameKey
      };
    },
    validateCartStatus() {
      const { material_id, sku_list } = this.dataSource;
      const cartNumber = this.cartNumber;
      if (typeof cartNumber !== "number" || cartNumber < 1) {
        return {
          status: false,
          params: {}
        };
      }

      if (!sku_list || sku_list.length === 0) {
        // TODO: 未定义场景（异常）
        return {
          status: false,
          params: {}
        };
      }

      const firstSku = sku_list[0];
      // 如果只存在一条 sku 记录，则默认选取
      if (sku_list.length === 1 && (firstSku.sku_prop || []).length === 0) {
        return {
          status: true,
          item: firstSku,
          params: {
            material_id,
            sku_id: firstSku.sku_id,
            quantity: cartNumber
          }
        };
      }

      // 当前选中的 sku 属性
      const activeKey = this.activeKey;
      const { existSkuIdKey } = this.skuListMap;
      // 取出当前选中的 sku 组
      const selectSkuGroup = Object.values(activeKey);

      const skuKeyGroup = selectSkuGroup.sort((a, b) => a - b).join("|");
      // 获取当前 sku_id 对应的属性组
      const findSkuItem = Reflect.get(existSkuIdKey, skuKeyGroup);

      const selectActiveKeys = Object.keys(activeKey);
      if (!findSkuItem || selectActiveKeys.length === 0) {
        return {
          status: false,
          params: {}
        };
      }

      return {
        status: true,
        item: findSkuItem,
        params: {
          material_id,
          sku_id: findSkuItem.sku_id,
          quantity: cartNumber
        }
      };
    }
  },
  methods: {
    /**
     * 禁用规则说明：
     * 1. 存在选项且小于可选项，不满足匹配规则
     * 2. 存在同组数据，且选项未选完
     * 3. 不在存在 sku 中
     */
    disabledKey(attribute_value_id) {
      const attrSameKey = Object.values(this.skuListMap.attrSameKey);
      const selectKeys = Object.values(this.activeKey);
      const validLen = this.skuListMap.attrGroupList.length;
      // 存在选项且小于可选项，不满足匹配规则，直接返回 false
      if (selectKeys.length < validLen - 1) {
        return false;
      }
      // 获取选项中属于同组的数据
      const filterSameKey = attrSameKey.filter(arr => {
        return selectKeys.find(key => arr.includes(key));
      });

      // 获取同一属性组数据
      const sameGroupKey = filterSameKey.filter(arr =>
        arr.includes(attribute_value_id)
      );

      // 存在同组数据，且选项未选完
      if (selectKeys.length !== validLen && sameGroupKey.length) {
        return false;
      }

      // 取出 attribute_value_id
      const { existSkuIdKey } = this.skuListMap;
      // 去除与当前 attribute_value_id 匹配的同组数据
      const aloneKeys = selectKeys.filter(key => {
        return !sameGroupKey.some(sameKeys => sameKeys.includes(key));
      });
      const selectSkuGroup = [...aloneKeys, attribute_value_id];
      const skuKeyGroup = selectSkuGroup.sort((a, b) => a - b).join("|");
      // 判断是否存在 SKU 组中
      const hasInSku = Reflect.has(existSkuIdKey, skuKeyGroup);

      // 不在存在 sku 中
      return !hasInSku;
    },
    handleClick(sku, tag) {
      if (this.disabledKey(tag.attribute_value_id)) {
        return;
      }
      const key = tag.attribute_value_id;
      const attrKey = sku.attribute_id;
      if (this.activeKey[attrKey] === key) {
        this.$delete(this.activeKey, attrKey);
        return;
      }
      this.$set(this.activeKey, attrKey, key);
    },
    handleAddToCart() {
      const params = this.validateCartStatus;
      if (params.status) {
        console.log(JSON.stringify(params, null, 2));
      }
    }
  }
};
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.cart-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 750px;
  margin: 0 auto;
}

.cart-main {
  padding: 12px;
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}

.cart-card {
  padding: 16px;
  box-shadow: 0px 2px 10px 0px rgba(93, 153, 240, 0.16);
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: #fff;
}

.cart-card-container + .cart-card-container {
  margin-top: 24px;
}

.cart-card-title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 16px;
}

.cart-card-box {
  display: block;
}

.cart-card-item {
  display: inline-block;
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  font-size: 24rpx;
  color: rgba(0, 0, 0, 0.65);
  border-radius: 32px;
  border: 1px solid #f3f4f5;
  background-color: #fff;
  + .cart-card-item {
    margin-left: 16px;
  }
  &.active {
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  &.disabled:not(.active) {
    color: rgba(0, 0, 0, 0.065);
    background-color: #f3f4f5;
  }
}

.cart-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45px;
  background-color: #408fff;
  background-image: linear-gradient(90deg, #408fff 0%, #42aaff 100%);
  box-shadow: 0px 6px 4px 0px rgba(100, 152, 223, 0.16);
  border-color: #408fff;
  color: #fff;
  &.disabled {
    background-color: #f3f4f5;
    background-image: none;
  }
}

.cart-row {
  display: flex;
  align-items: flex-start;
  .cart-img {
    display: block;
    width: 120px;
    height: 120px;
    margin-right: 16px;
  }
  .cart-info {
    flex: 1;
  }
  .cart-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 8px;
    width: 100%;
    overflow: hidden;
  }
  .cart-money {
    color: #fe6b5d;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
  }
  .cart-stock {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
}
</style>
