<template>
  <section ref="wrapper">
    <h3>ثبت نام</h3>
    <h6>برای ثبت نام لازم است اطلاعات خود را وارد نمایید</h6>
    <v-form autocomplete="off">
      <div>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('username')"
          prepend-inner-icon="account_circle"
          name="username"
          v-model="new_user.username"
          label="نام کاربری"
          id="id"
        ></v-text-field>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('password')"
          prepend-inner-icon="lock"
          name="password"
          v-model="new_user.password"
          label="رمز ورود"
          id="id"
        ></v-text-field>

        <!-- <v-text-field
          v-validate="'required|email'"
          :error-messages="errors.collect('email')"
          prepend-inner-icon="email"
          name="email"
          v-model="new_user.email"
          label="ایمیل"
          id="id"
        ></v-text-field>-->
        <!-- <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('password')"
          type="password"
          prepend-inner-icon="lock"
          name="password"
          v-model="new_user.password"
          label="رمز عبور"
          id="id"
        ></v-text-field>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('passwordConfirm')"
          type="passwordConfirm"
          prepend-inner-icon="lock"
          name="passwordConfirm"
          v-model="new_user.passwordConfirm"
          label="تکرار رمز عبور"
          id="id"
        ></v-text-field>-->
      </div>
      <div class="remember-me">
        <v-checkbox
          v-validate="'required'"
          :error-messages="errors.collect('condition')"
          color="primary"
          name="condition"
          label="قبول شرایط سایت"
          v-model="new_user.accept_condition"
        ></v-checkbox>
      </div>
      <v-btn @click="register" rounded color="info">ثبت نام</v-btn>
      <v-btn @click="$emit('changeView', 'login')" rounded color="accent"
        >انصراف</v-btn
      >
    </v-form>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      new_user: <any>{}
    }
  },
  methods: {
    async register() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        let loading = this.$loader.show(this.$refs.wrapper)
        // const token = await this.$recaptcha.execute('login')
        // this.new_user.recaptcha = token

        try {
          await this.$service.auth_user.register(this.new_user)
          this.$emit('changeView', 'login')
          this.$toast.success().showSimple('با موفقیت ثبت شد')
        } catch (err) {
          let msg
          try {
            msg = err.response.data.message
          } catch {
            msg = 'خطایی رخ داده است لطفا مجددا تلاش کنید'
          }
          this.$toast.error().showSimple(msg)
        }
        loading.hide()
      }
    }
  }
})
</script>
