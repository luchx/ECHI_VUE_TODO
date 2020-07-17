import Vue from "vue";
import Logo from "@/assets/image/logo.png";
import classNames from "classnames";
import styles from "./index.module.less";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      focusName: "",
      phone: "",
      code: "",
      sendingCodeStatus: false,
      sendingCodeText: "",
      leftTime: 120,
      handleTimer: null,
      submitStatus: false
    };
  },
  methods: {
    // 手机号码输入操作
    handlePhoneChange(event) {
      this.setState({
        phone: event.target.value
      });
    },

    // 验证码输入操作
    handleCodeChange(event) {
      this.setState({
        code: event.target.value
      });
    },

    // 输入框获取焦点
    handleInputFocus(key) {
      this.setState({
        focusName: key
      });
    },

    // 输入框失去焦点
    handleInputBlur() {
      this.setState({
        focusName: ""
      });
    },

    validatePhone(phone) {
      if (!phone) {
        this.$toast.info("请输入您的手机号码");
        return false;
      }
      // if (!TestPhone(phone)) {
      //   this.$toast.info("您的号码输入错误");
      //   return false;
      // }
      // return true;
    },

    // 发送验证码
    handleSendCode() {
      const { phone } = this.$data;
      if (!this.validatePhone(phone)) {
        return;
      }
      // ApiGetVerifyCode(phone)
      //   .then(result => {
      //     if (result.status) {
      //       this.$toast.info("验证码为:" + result.data);
      //       this.getLeftTime();
      //     } else {
      //       this.$toast.info(result.message);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    // 倒计时获取剩余时间
    getLeftTime() {
      let leftTime = this.$data.leftTime;
      this.setState({
        sendingCodeStatus: true,
        sendingCodeText: leftTime + "s"
      });
      if (this.$data.handleTimer !== undefined) {
        clearInterval(this.$data.handleTimer);
        this.setState({
          handleTimer: null
        });
      }
      const handleTimer = setInterval(() => {
        leftTime--;
        if (leftTime < 0) {
          this.setState({
            sendingCodeStatus: false,
            sendingCodeText: "获取验证码"
          });
          leftTime = this.$data.leftTime;
          clearInterval(handleTimer);
        } else {
          this.setState({
            sendingCodeText: leftTime + "s"
          });
        }
      }, 1000);
      this.setState({
        handleTimer: handleTimer
      });
    },

    handleSubmit() {
      const { phone, code } = this.$data;
      if (!this.validatePhone(phone)) {
        return;
      }
      if (code.length === 0) {
        return this.$toast.info("请输入验证码");
      }
      // ApiMemberLogin(phone, code)
      //   .then(result => {
      //     if (result.status) {
      //       if (result.data.created) {
      //         this.$toast.info("已为您自动创建帐号,正在登录...", 2);
      //       } else {
      //         this.$toast.info("欢迎回来!!!", 2);
      //       }
      //       local.set("echi_user_id", result.data.id);
      //       setTimeout(() => {
      //         this.props.history.replace({ pathname: "/member" });
      //       }, 1500);
      //     } else {
      //       this.$toast.info(result.message, 2);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  render() {
    return (
      <EContainer>
        <div class={styles.loginWrapper}>
          <div class={styles["login-verify-content"]}>
            <div class={styles["login-verify-logo"]}>
              <img src={Logo} alt="logo" title="logo" />
            </div>
          </div>
          <form class={styles["login-verify-check"]}>
            <div class={styles["login-verify-item"]}>
              <label>手机号码</label>
              <div
                class={classNames(styles["login-verify-input"], {
                  [styles["focus"]]: "phone" === this.$data.focusName
                })}
              >
                <input
                  type="number"
                  ref="phone"
                  placeholder="请输入手机号码"
                  autoFocus
                  value={this.$data.phone}
                  onChange={event => this.handlePhoneChange(event)}
                  onFocus={() => this.handleInputFocus("phone")}
                  onBlur={() => this.handleInputBlur()}
                />
              </div>
            </div>
            <div class={styles["login-verify-item"]}>
              <label>验证码</label>
              <div
                class={classNames(styles["login-verify-input"], {
                  [styles["focus"]]: "code" === this.$data.focusName
                })}
              >
                <input
                  type="number"
                  placeholder="请输入验证码"
                  value={this.$data.code}
                  onChange={event => this.handleCodeChange(event)}
                  onFocus={() => this.handleInputFocus("code")}
                  onBlur={() => this.handleInputBlur()}
                />
                <div class={styles["login-verify-btn"]}>
                  <van-button
                    type="primary"
                    size="small"
                    onClick={() => this.handleSendCode()}
                    disabled={this.$data.sendingCodeStatus}
                  >
                    {this.$data.sendingCodeStatus
                      ? this.$data.sendingCodeText
                      : "发送验证码"}
                  </van-button>
                </div>
              </div>
            </div>
            <div class={styles["login-verify-bottom"]}>
              <van-button
                type="primary"
                onClick={() => this.handleSubmit()}
                disabled={this.$data.submitStatus}
              >
                提交
              </van-button>
            </div>
          </form>
        </div>
      </EContainer>
    );
  }
});
