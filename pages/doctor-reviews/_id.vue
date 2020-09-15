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
      service: this.$service.doctor_reviews,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{}
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش نظر `
      this.loading = false
    } else {
      this.title = 'ایجاد نظر جدید'
    }
    this.formData = [
      {
        rows: [
          {
            label: 'آیدی پزشک',
            type: 'textField',
            validation: { required: true },
            placeholder: 'آیدی پزشک را به فارسی وارد نمایید',
            model: 'doctor_subscriber'
          },
          {
            label: 'نام و نام خانوادگی بیمار',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام و نام خانوادگی بیمار را به فارسی وارد نمایید',
            model: 'owner_name'
          },
          {
            label: 'متن',
            type: 'textArea',
            validation: { required: true },
            placeholder: 'متن را به فارسی وارد نمایید',
            model: 'text'
          },
          {
            label: 'تاریخ ثبت نظر',
            type: 'datePicker',
            validation: { required: true },
            placeholder: 'تاریخ ثبت نظر',
            model: 'review_at'
          }
        ]
      }
    ]
  }
})
</script>
