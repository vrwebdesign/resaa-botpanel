<template>
  <section ref="wrapper">
    <h3>پسورد جدید را وارد نمایید</h3>
    <v-form autocomplete="off">
      <div>
        <v-text-field
          v-validate="'required'"
          :error-messages="errors.collect('token')"
          prepend-inner-icon="account_circle"
          name="token"
          v-model="user.token"
          label="توکن"
          id="id"
        ></v-text-field>
        <v-text-field
          ref="password"
          v-validate="'required'"
          :error-messages="errors.collect('newPassword')"
          type="password"
          prepend-inner-icon="lock"
          name="newPassword"
          v-model="user.password"
          label="رمز عبور جدید"
          id="id"
        ></v-text-field>
        <v-text-field
          v-validate="'required|confirmed:password'"
          :error-messages="errors.collect('passwordConfirm')"
          type="password"
          prepend-inner-icon="lock"
          name="passwordConfirm"
          v-model="user.passwordConfirm"
          label="تکرار رمز عبور"
          id="id"
        ></v-text-field>
      </div>
      <v-btn @click="change_password" rounded color="info">تایید</v-btn>
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
      user: <any>{
        username: this.$store.state.reset_password.userName,
        token: null,
        password: null,
        passwordConfirm: null
      }
    }
  },
  methods: {
    async change_password() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        let loading = this.$loader.show(this.$refs.wrapper)
        const token = await this.$recaptcha.execute('login')
        this.user.recaptcha = token
        try {
          await this.$service.auth_user.reset_password(this.user)
          this.$toast.success().showSimple('پسورد شما با موفقیت تغییر پیدا کرد')
          this.$emit('changeView', 'login')
        } catch (error) {
          if (error.response.data.status === 102) {
            this.$toast.error().showSimple('کاربر مورد نظر یافت نشد')
          } else if (error.response.data.status === 103) {
            this.$toast.error().showSimple('کاربر مورد نظر موبایل ندارد')
          } else if (error.response.data.status === 104) {
            this.$toast.error().showSimple('توکن معتبر نیست')
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
