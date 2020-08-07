import { defineComponent, reactive } from "vue";
import Logo from "/@/assets/image/logo.png";
import classNames from "classnames";
import { useStore } from 'vuex';
import { ApiGetVerify, ApiLogin } from "/@/api/user";
import { TestPhone } from "/@/utils/validate";
import { local } from "/@/utils/storage";
import EContainer from '/@/components/Container';
import EButton from '/@/components/Button';
import { Toast } from '/@/components/Toast';
import styles from "./index.module.less";
import { useRouter } from 'vue-router';

type State = {
  focusName: string;
  phone: string;
  code: string;
  sendingCodeStatus: boolean,
  sendingCodeText: string;
  leftTime: number,
  handleTimer: any,
  submitStatus: boolean
}

export default defineComponent({
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive<State>({
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
      state.phone = event.target.value;
    }

    // 输入框获取焦点
    const handleInputFocus = (key) => {
      state.focusName = key;
    }

    // 输入框失去焦点
    const handleInputBlur = () => {
      state.focusName = "";
    }

    // 验证码输入操作
    const handleCodeChange = (event) => {
      state.code = event.target.value;
    }

    const validatePhone = (phone: string): boolean => {
      if (!phone) {
        Toast("请输入您的手机号码");
        return false;
      }
      if (!TestPhone(phone)) {
        Toast("您的号码输入错误");
        return false;
      }
      return true;
    }

    // 倒计时获取剩余时间
    const getLeftTime = () => {
      let leftTime = state.leftTime;
      state.sendingCodeStatus = true;
      state.sendingCodeText = `${leftTime} s`;
      if (state.handleTimer !== undefined) {
        clearInterval(state.handleTimer);
        state.handleTimer = null;
      }
      const handleTimer = setInterval(() => {
        leftTime--;
        if (leftTime < 0) {
          state.sendingCodeStatus = false;
          state.sendingCodeText = "获取验证码";
          leftTime = state.leftTime;
          clearInterval(handleTimer);
        } else {
          state.sendingCodeText = `${leftTime} s`;
        }
      }, 1000);
      state.handleTimer = handleTimer;
    }

    // 发送验证码
    const handleSendCode = () => {
      const { phone } = state;
      if (!validatePhone(phone)) {
        return;
      }

      getLeftTime();
      ApiGetVerify(phone)
        .then(resp => {
          if (resp.code === 0) {
            Toast("验证码为:" + resp.result);
            getLeftTime();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    const handleSubmit = () => {
      const { phone, code } = state;

      if (!validatePhone(phone)) {
        return;
      }
      if (code.length === 0) {
        return Toast("请输入验证码");
      }

      ApiLogin({ phone, code })
        .then(resp => {
          if (resp.code === 0) {
            Toast("欢迎回来!!!");
            local.set("token", resp.result.token);
            store.dispatch("updateUser", resp.result);
            router.replace({ path: "/" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }

    return {
      state,
      handlePhoneChange,
      handleInputFocus,
      handleInputBlur,
      handleCodeChange,
      handleSendCode,
      handleSubmit
    }
  },
  render() {
    const {
      state,
      handlePhoneChange,
      handleInputFocus,
      handleInputBlur,
      handleCodeChange,
      handleSendCode,
      handleSubmit,
    } = this;

    return (
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
                  [styles.focus]: "phone" === state.focusName
                })}
              >
                <input
                  type="number"
                  placeholder="请输入手机号码"
                  value={state.phone}
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
                  [styles.focus]: "code" === state.focusName
                })}
              >
                <input
                  type="number"
                  placeholder="请输入验证码"
                  value={state.code}
                  onInput={handleCodeChange}
                  onFocus={() => handleInputFocus("code")}
                  onBlur={handleInputBlur}
                />
                <div class={styles.checkBoxBtn}>
                  <EButton
                    type="primary"
                    size="small"
                    block
                    onClick={handleSendCode}
                    disabled={state.sendingCodeStatus}
                  >
                    {state.sendingCodeStatus ? state.sendingCodeText : "发送验证码"}
                  </EButton>
                </div>
              </div>
            </div>
            <EButton
              type="info"
              block
              onClick={handleSubmit}
              disabled={state.submitStatus}
            >
              提交
            </EButton>
          </div>
        </div>
      </EContainer>
    );
  }
});
