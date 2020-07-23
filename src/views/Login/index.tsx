import { defineComponent, reactive } from "vue";
import Logo from "/@/assets/image/logo.png";
import classNames from "classnames";
import styles from "./index.module.less";
import { ApiGetVerify, ApiLogin } from "/@/api/user";
import { TestPhone } from "/@/utils/validate";
import { local } from "/@/utils/storage";
// import { Toast } from 'vant';
import EContainer from '/@/components/Container';

// console.log({
//   Toast
// })

export default defineComponent({
  name: "Login",
  setup() {
    const data: any = reactive({
      focusName: "",
      phone: "",
      code: "",
      sendingCodeStatus: false,
      sendingCodeText: "",
      leftTime: 120,
      handleTimer: null,
      submitStatus: false
    });

    // 手机号码输入操作
    const handlePhoneChange = (event) => {
      data.phone = event.target.value;
    }

    // 输入框获取焦点
    const handleInputFocus = (key) => {
      data.focusName = key;
    }

    // 输入框失去焦点
    const handleInputBlur = () => {
      data.focusName = "";
    }

    // 验证码输入操作
    const handleCodeChange = (event) => {
      data.code = event.target.value;
      console.log({
        event
      });
    }

    const validatePhone = (phone) => {
      if (!phone) {
        // Toast("请输入您的手机号码");
        return false;
      }
      if (!TestPhone(phone)) {
        // Toast("您的号码输入错误");
        return false;
      }
      return true;
    }

    // 倒计时获取剩余时间
    const getLeftTime = () => {
      let leftTime = data.leftTime;
      data.sendingCodeStatus = true;
      data.sendingCodeText = `${leftTime} s`;
      if (data.handleTimer !== undefined) {
        clearInterval(data.handleTimer);
        data.handleTimer = null;
      }
      const handleTimer = setInterval(() => {
        leftTime--;
        if (leftTime < 0) {
          data.sendingCodeStatus = false;
          data.sendingCodeText = "获取验证码";
          leftTime = data.leftTime;
          clearInterval(handleTimer);
        } else {
          data.sendingCodeText = `${leftTime} s`;
        }
      }, 1000);
      data.handleTimer = handleTimer;
    }

    // 发送验证码
    const handleSendCode = () => {
      const { phone } = data;
      if (!validatePhone(phone)) {
        return;
      }

      getLeftTime();
      ApiGetVerify(phone)
        .then(resp => {
          if (resp.code === 0) {
            // Toast("验证码为:" + resp.result);
            getLeftTime();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    const handleSubmit = () => {
      const { phone, code } = data;
      if (!validatePhone(phone)) {
        return;
      }
      // if (code.length === 0) {
      //   return Toast("请输入验证码");
      // }
      ApiLogin({ phone, code })
        .then(resp => {
          if (resp.code === 0) {
            // Toast("欢迎回来!!!");
            local.set("token", resp.result.token);
            // dispatch("updateUser", resp.result);
            // router.replace({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }


    return () => (
      <EContainer>
        <div class={styles.loginWrapper}>
          <div class={styles.content}>
            <div class={styles.logo}>
              <img src={Logo} alt="logo" title="logo" />
            </div>
          </div>
          <div class={styles.checkBox}>
            <div class={styles.checkBoxItem}>
              <label>手机号码</label>
              <div
                class={classNames(styles.checkBoxInput, {
                  [styles.focus]: "phone" === data.focusName
                })}
              >
                <input
                  type="number"
                  placeholder="请输入手机号码"
                  value={data.phone}
                  onInput={handlePhoneChange}
                  onFocus={() => handleInputFocus("phone")}
                  onBlur={handleInputBlur}
                />
              </div>
            </div>
            <div class={styles.checkBoxItem}>
              <label>验证码</label>
              <div
                class={classNames(styles.checkBoxInput, {
                  [styles.focus]: "code" === data.focusName
                })}
              >
                <input
                  type="number"
                  placeholder="请输入验证码"
                  value={data.code}
                  onInput={handleCodeChange}
                  onFocus={() => handleInputFocus("code")}
                  onBlur={handleInputBlur}
                />
                <div class={styles.checkBoxBtn}>
                  <van-button
                    type="primary"
                    size="small"
                    block
                    onClick={handleSendCode}
                    disabled={data.sendingCodeStatus}
                  >
                    {data.sendingCodeStatus ? data.sendingCodeText : "发送验证码"}
                  </van-button>
                </div>
              </div>
            </div>
            <van-button
              type="info"
              block
              onClick={handleSubmit}
              disabled={data.submitStatus}
            >
              提交
            </van-button>
          </div>
        </div>
      </EContainer>
    );
  }
});
