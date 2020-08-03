<template>
  <div class="login-container">
    <div class="logo">
      <img
        src="@/assets/login_images/rbp-logo.png"
        class="logo-img"
        title="RBP-业务中台">
    </div>
    <div class="login-content">
      <div class="login-content-box login-form">
        <div class="login-content-title">
          <h4>{{ $t('commonWord.login') }}</h4>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ $t(currentLang) }}<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in lang"
                :key="item.key"
                :command="item"
                :class="{ active: currentLang === item.lang }"
                :divided="index !== 0">
                {{ $t(item.lang) }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules">
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.userNo"
              type="text"
              class="login-input"
              :placeholder="$t('form.placeholder.userAccount')" />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              :key="passwordType"
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="$t('form.placeholder.password')"
              name="password"
              class="login-input"
              @keyup.enter.native="handleLogin" />
            <span
              class="show-pwd"
              @click="showPwd">
              <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            @click.native.prevent="handleLogin">
            {{ $t('commonWord.login') }}
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { validUsername } from '@/utils/validate'
import Vue from 'vue'
import Component from 'vue-class-component'
interface LangConfig {
  label: string
  en: string
  lang: any
  key: string
}
const validateUsername = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
// const validatePassword = (rule, value, callback) => {
//   if (value.length < 5) {
//     callback(new Error('密码不能小于5位数!'))
//   } else {
//     callback()
//   }
// }
@Component({
  name: 'Login'
})
export default class App extends Vue {
  loginForm = {
    userNo: '',
    password: ''
  }
  loginRules = {
    userNo: [{ required: true, trigger: 'blur', validator: validateUsername }]
    // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  }
  lang: LangConfig[] = [
    {
      label: '中文(简体)',
      en: 'Chinese',
      lang: 'commonWord.zh',
      key: 'zh_CHS'
    },
    {
      label: '英文',
      en: 'English',
      lang: 'commonWord.en',
      key: 'en'
    }
  ]
  currentLang = 'commonWord.zh'
  loading: boolean = false
  passwordType: string = 'password'

  showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      const passwordDom: any = this.$refs.password
      passwordDom.focus()
    })
  }

  handleLogin() {
    const formDom: any = this.$refs.loginForm
    formDom.validate((valid: boolean): void => {
      if (valid) {
        this.loading = true

        this.$store
          .dispatch('user/login', this.loginForm)
          .then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          })
          // eslint-disable-next-line handle-callback-err
          .catch((err) => {
            this.loading = false
          })
      } else {
        return
      }
    })
  }

  handleCommand(command) {
    this.currentLang = command.lang
    this.$i18n.locale = command.key
    this.$store.dispatch('app/setLanguage', command.key)
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

// $bg:#283443;
$light_gray: #34353b;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    // display: inline-block;
    // height: 47px;
    // width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 52px;
      caret-color: $light_gray;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $cursor inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

}
</style>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
  background:url('../../assets/login_images/bg.webp') no-repeat fixed center, url('../../assets/login_images/rbp-bd2.png') no-repeat fixed center;
  background-size: cover;
  .logo {
       padding: 20px 0 0 20px;
    height: 8vh;
    box-sizing: border-box;
    &-img {
      width: 84px;
      height: 48px;
    }
  }

  .login-content {

    position: relative;
    padding: 0 70px 0 70px;
    // background:url('../../assets/login_images/card.webp') no-repeat, url('../../assets/login_images/rbp-bd1.png') no-repeat;
    background:url('../../assets/login_images/card.webp') no-repeat, url('../../assets/login_images/rbp-bd1.png') content-box no-repeat;

    background-size: 100% 100%;
    // background-size: cover;
    height: 90vh;
    min-height: 700px;
    // height: 80vh;
    box-sizing: border-box;
    background-origin: content-box;

    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 52px;
      > h4 {
        font-size: 28px;
        margin: 0;
        font-weight: bold;
      }
    }
  }
  .login-form {
    min-width: 332px;
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translate(0, -50%);
  }
  .login-btn {
    width: 100%;
    height: 52px;
    border-radius: 26px;
    background: linear-gradient(90deg, rgba(84, 186, 250, 1) 0%, rgba(28, 94, 245, 1) 100%);
    box-shadow: 0px 8px 16px -4px rgba(24, 108, 255, 0.5);
    border: none;
    font-size: 14px;
    letter-spacing: 5px;
    color: #fff;
  }
  .login-input {
    // height: 52px;
    // line-height: 52px;
    background: #fff;
    border: none;
    border-bottom: 1px solid #d7d7d7;
    color: #34353b;
    border-radius: inherit;
    /deep/.el-input__inner {
      border-radius: inherit;
      border: none;
      height: 52px;
      line-height: 52px;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
.active {
  color: #34353b !important;
}
.el-dropdown-link {
  line-height: 20px;
}
/deep/.el-dropdown-menu__item {
  height: 60px;
  line-height: 60px;
  width: 120px;
  text-align: center;
  color: #b5bac5;
}
/deep/.el-dropdown-menu {
  box-shadow: 0px 12px 32px 0px rgba(166, 167, 173, 0.5);
  border-radius: 12px;
}
</style>
