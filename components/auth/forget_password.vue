<template>
  <section ref="wrapper">
    <h3>فراموشی رمز عبور</h3>
    <v-form autocomplete="off">
      <div>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('username')"
          prepend-inner-icon="account_circle"
          name="username"
          v-model="forgetPassword.username"
          label="نام کاربری"
          id="id"
        ></v-text-field>
      </div>
      <v-btn @click="forget_password" rounded color="info">درخواست</v-btn>
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
      forgetPassword: <any>{
        username: null
      }
    }
  },
  methods: {
    async forget_password() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        let loading = this.$loader.show(this.$refs.wrapper)
        const token = await this.$recaptcha.execute('login')
        this.forgetPassword.recaptcha = token
        try {
          let res = await this.$service.auth_user.mobile_check(
            this.forgetPassword
          )
          this.$toast
            .success()
            .timeout(3000)
            .showSimple(
              `با موفقیت ثبت شد توکن به شماره موبایل ${res.mobile} پیامک شد`
            )
          this.$store.commit('reset_password/mobile', res.mobile)
          this.$store.commit('reset_password/userName', res.username)
          this.$emit('changeView', 'new_password')
        } catch (error) {
          if (error.response.data.status === 102) {
            this.$toast.error().showSimple('کاربر مورد نظر یافت نشد')
          } else if (error.response.data.status === 103) {
            this.$toast.error().showSimple('کاربر مورد نظر موبایل ندارد')
          } else {
            this.$toast
              .error()
              .showSimple('خطایی رخ داده است لطفا مجدد تلاش کنید')
          }
        }
        loading.hide()
      }
    }
  }
})
</script>
