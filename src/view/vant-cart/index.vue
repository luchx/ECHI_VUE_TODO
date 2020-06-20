<template>
  <div class="cart-box">
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :quota="quota"
      :quota-used="quotaUsed"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
    />
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      show: true,
      quota: 0,
      quotaUsed: 8,
      // 商品 id
      goodsId: "946755",
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "143", // skuValueId：规格值 id
                name: "白色", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              },
              {
                id: "144", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              },
              {
                id: "145",
                name: "蓝色",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "内存", // skuKeyName：规格类目名称
            v: [
              {
                id: "243", // skuValueId：规格值 id
                name: "32G", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              },
              {
                id: "244",
                name: "64G",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "上市年份", // skuKeyName：规格类目名称
            v: [
              {
                id: "343", // skuValueId：规格值 id
                name: "2019", // skuValueName：规格值名称
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              },
              {
                id: "344",
                name: "2020",
                imgUrl: "https://img.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img.yzcdn.cn/2p.jpg"
              }
            ],
            k_s: "s3" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 1, // skuId，下单时后端需要
            price: 78, // 价格（单位分）
            s1: "143", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "343", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2, // skuId，下单时后端需要
            price: 77, // 价格（单位分）
            s1: "143", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "344", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 3, // skuId，下单时后端需要
            price: 78, // 价格（单位分）
            s1: "143", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "343", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 4, // skuId，下单时后端需要
            price: 88, // 价格（单位分）
            s1: "143", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 5, // skuId，下单时后端需要
            price: 89, // 价格（单位分）
            s1: "144", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "343", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 6, // skuId，下单时后端需要
            price: 87, // 价格（单位分）
            s1: "144", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 7, // skuId，下单时后端需要
            price: 98, // 价格（单位分）
            s1: "144", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 8, // skuId，下单时后端需要
            price: 98, // 价格（单位分）
            s1: "144", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "344", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 9, // skuId，下单时后端需要
            price: 90, // 价格（单位分）
            s1: "145", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "343", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 10, // skuId，下单时后端需要
            price: 45, // 价格（单位分）
            s1: "145", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "243", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 11, // skuId，下单时后端需要
            price: 67, // 价格（单位分）
            s1: "145", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "343", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 12, // skuId，下单时后端需要
            price: 54, // 价格（单位分）
            s1: "145", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "244", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "344", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "留言", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "1", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/2.jpg"
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "xxx",
          tel: "xxx"
        },
        // 初始留言信息
        // 键：留言 name
        // 值：留言内容
        initialMessages: {
          留言: "留言信息"
        }
      }
    };
  }
};
</script>

<style lang="css">
</style>
