<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="service"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import quizAnswer from '@/components/quiz/quizAnswer.vue'
export default Vue.extend({
  data() {
    return {
      date: null,
      title: '',
      service: this.$service.patients,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{}
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش بیمار {{name}}`
      this.loading = false
    } else {
      this.title = 'ایجاد بیمار جدید'
    }
    this.formData = [
      {
        rows: [
          {
            label: 'نام و نام خانوادگی بیمار',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام و نام خانوادگی بیمار را به فارسی وارد نمایید',
            model: 'name'
          },
          {
            label: 'موبایل',
            type: 'textField',
            validation: { required: true },
            placeholder: 'موبایل را به فارسی وارد نمایید',
            model: 'mobile'
          },
          {
            label: 'ایمیل',
            type: 'textField',
            validation: { required: true, email: true },
            placeholder: 'ایمیل را به فارسی وارد نمایید',
            model: 'email'
          }
        ]
      }
    ]
  }
})
</script>
