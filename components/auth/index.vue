<style lang="scss">
section#login {
  display: flex;
  height: 100vh;
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 600px;
    width: 600px;
    padding: 32px 100px;
    .content-wrapper {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      > * {
        width: 100%;
        text-align: center;
      }
      h3 {
        text-align: center;
        font-size: 1.5rem;
        color: #6c7293;
        font-weight: 500;
      }
    }
    .v-btn {
      height: 40px;
      padding: 0 48px;
    }

    .v-form {
      margin-top: 48px;
    }
    .remember-me {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      width: 160px;
      img {
        max-width: 100%;
      }
    }
  }
  .login-extra {
    display: flex;
    flex: 1;
    background: url('./bg-4.jpg');
    background-size: cover;
    align-items: center;
    justify-content: center;
    > div {
      width: 600px;
      color: #fff;
    }
    h3 {
      font-weight: 500;
      font-size: 48px;
      margin-bottom: 28px;
    }
    span {
      line-height: 28px;
    }
  }
  .v-text-field .v-input__prepend-inner {
    padding-inline-start: 4px;
  }
  h6 {
    color: #a7abc3;
    font-weight: 400;
    font-size: 0.925rem;
    margin-top: 8px;
  }
}

.leave {
  animation-duration: 0.4s !important;
}
</style>
<template>
  <section id="login">
    <div class="login-form">
      <div class="content-wrapper">
        <div class="logo">
          <img src="~assets/img/logo.png" alt />
        </div>
        <transition
          mode="out-in"
          enter-active-class="animated flipInX"
          leave-active-class="animated fadeOut leave"
        >
          <div key="login" v-if="view_mode == 'login'">
            <Login @changeView="changeView" />
          </div>
          <div key="register" v-else-if="view_mode == 'register'">
            <Register @changeView="changeView" />
          </div>
          <div key="forget_password" v-else-if="view_mode == 'forget_password'">
            <ForgetPassword @changeView="changeView" />
          </div>
          <div key="new_password" v-else-if="view_mode == 'new_password'">
            <NewPassword @changeView="changeView" />
          </div>
        </transition>
      </div>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated zoomOut"
      >
        <div class="register" v-if="view_mode == 'login'">
          حساب کاربری ندارید؟
          <a @click="view_mode = 'register'">ثبت نام کنید</a>
        </div>
      </transition>
    </div>

    <div class="login-extra">
      <div>
        <h3>ورود به پنل مدیریت بات رسا</h3>
        <span
          >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
          استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</span
        >
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Login from './login.vue'
import Register from './register.vue'
import ForgetPassword from './forget_password.vue'
import NewPassword from './new_password.vue'
export default Vue.extend({
  components: {
    Login,
    Register,
    ForgetPassword,
    NewPassword
  },
  data() {
    return {
      view_mode: 'login'
    }
  },
  methods: {
    changeView(view) {
      this.view_mode = view
    }
  }
})
</script>
