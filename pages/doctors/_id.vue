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
      service: this.$service.doctors,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{
        answers: []
      }
    }
  },
  async mounted() {
    if (this.$route.params.id == 'create') {
      this.title = `افزودن پزشک جدید`
    } else {
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش پزشک {{first_name}} {{last_name}}`
    }
    this.formData = [
      {
        rows: [
          {
            label: 'نام',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام را به فارسی وارد نمایید',
            model: 'first_name'
          },
          {
            label: 'نام خانوادگی',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام خانوادگی را به فارسی وارد نمایید',
            model: 'last_name'
          },
          {
            label: 'کد رسا',
            type: 'textField',
            validation: { required: true, number: true },
            placeholder: 'کد رسا را به فارسی وارد نمایید',
            model: 'subscriber_number'
          },
          {
            label: 'سابقه کار',
            type: 'textField',
            validation: { number: true },
            placeholder: 'سابقه کار را به فارسی وارد نمایید',
            suffix: 'سال',
            model: 'work_experience'
          },
          {
            label: 'قیمت هر دقیقه',
            type: 'currency',
            placeholder: 'قیمت هر دقیقه را به دلار وارد نمایید',
            suffix: '$',
            model: 'price_per_minute'
          },
          {
            label: 'دسترسی به مشاور با فرهنگ و زبان فارسی',
            type: 'textField',
            validation: { number: true },
            placeholder: 'دسترسی به مشاور با فرهنگ و زبان فارسی را وارد نمایید',
            suffix: '%',
            model: 'culture_access'
          },
          {
            label: 'دسترسی راحت‌تر به پزشک متخصص',
            type: 'textField',
            validation: { number: true },
            placeholder: 'دسترسی راحت‌تر به پزشک متخصص را وارد نمایید',
            suffix: '%',
            model: 'speciaity_access'
          },
          {
            label: 'توضیحات پزشک',
            type: 'textArea',
            placeholder: 'توضیحات پزشک',
            model: 'description'
          },
          {
            label: 'عکس پزشک',
            type: 'fileUpload',
            placeholder: 'عکس پزشک',
            model: 'image'
          }
        ]
      }
    ]
  }
})
</script>
