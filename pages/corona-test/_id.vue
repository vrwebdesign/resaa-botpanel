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
      title: <any>null,
      service: this.$service.corona_test,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{
        answers: []
      }
    }
  },
  async mounted() {
    if (this.$route.params.id == 'create') {
      this.title = `افزودن درخواست تست کرونا جدید`
    } else {
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش درخواست تست کرونا {{name}} {{mobile}}`
    }
    this.formData = [
      {
        rows: [
          {
            label: 'نوع تست',
            type: 'select',
            items: this.$enum.corona_test.toSelect,
            placeholder: 'نوع تست ',
            model: 'doctor_id'
          },
          {
            label: 'نام و نام خانوادگی',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام و نام خانوادگی را به فارسی وارد نمایید',
            model: 'name'
          },
          {
            label: 'شماره همراه بیمار',
            type: 'textField',
            validation: { required: true, mobile: true },
            placeholder: 'شماره همراه بیمار را به فارسی وارد نمایید',
            model: 'mobile'
          },
          {
            label: 'شماره همراه رسا',
            type: 'textField',
            validation: { required: true, mobile: true },
            placeholder: 'شماره همراه رسا را به فارسی وارد نمایید',
            model: 'phoneNumber'
          },
          {
            label: 'آدرس بیمار',
            type: 'textArea',
            validation: { required: true },
            placeholder: 'آدرس بیمار را به فارسی وارد نمایید',
            model: 'address'
          },
          {
            label: 'قیمت',
            type: 'currency',
            placeholder: 'قیمت را به تومان وارد نمایید',
            suffix: 'تومان',
            model: 'amount'
          },
          {
            label: 'وضعیت پرداخت',
            type: 'select',
            items: this.$enum.corona_test_status.toSelect,
            placeholder: 'وضعیت پرداخت ',
            model: 'status'
          },
          {
            label: 'کد پیگیری پرداخت',
            type: 'textField',
            placeholder: 'کد پیگیری پرداخت ',
            model: 'chargeRequestId'
          },
          {
            label: 'کد پیگیری درگاه',
            type: 'textField',
            placeholder: 'کد پیگیری درگاه ',
            model: 'trackingNumber'
          },
          {
            label: 'رسید کارت به کارت',
            type: 'fileUpload',
            model: 'trackingImage'
          },
          {
            label: 'توضیحات',
            type: 'textArea',
            placeholder: 'توضیحات ',
            model: 'description'
          }
        ]
      }
    ]
  }
})
</script>
