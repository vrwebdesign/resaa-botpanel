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
      service: this.$service.reservations,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{}
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش رزور {{track_id}}`
      this.loading = false
    } else {
      this.title = 'ایجاد رزور جدید'
    }
    this.formData = [
      {
        rows: [
          {
            label: 'بیمار',
            type: 'autocomplete',
            async: true,
            queryService: () => {
              return this.$service.patients.$query().then(res => {
                return res.data.map(item => ({
                  text: item.name,
                  value: item.id
                }))
              })
            },
            validation: { required: true },
            placeholder: 'بیمار را انتخاب نمایید',
            model: 'patient_id'
          },
          {
            label: 'کد پزشک',
            type: 'textField',
            validation: { required: true },
            placeholder: 'کد پزشک را وارد نمایید',
            model: 'doctor_subscriber'
          },
          {
            label: 'کد پیگیری',
            type: 'textField',
            hide: !this.item.id,
            disabled: this.item.id,
            validation: { required: true },
            placeholder: 'کد پیگیری را به فارسی وارد نمایید',
            model: 'track_id'
          },
          {
            label: 'وضعیت ',
            type: 'select',
            items: this.$enum.reservation_status.toSelect,
            validation: { required: true },
            placeholder: 'وضعیت  راانتخاب نمایید',
            model: 'status'
          },
          {
            label: 'توضیحات',
            type: 'textArea',
            validation: { required: true },
            placeholder: 'توضیحات را به فارسی وارد نمایید',
            model: 'description'
          },
          {
            label: 'تاریخ شروع',
            type: 'datePicker',
            datePickerType: 'datetime',
            validation: { required: true },
            placeholder: 'تاریخ شروع',
            model: 'start'
          },
          {
            label: 'تاریخ پایان',
            type: 'datePicker',
            datePickerType: 'datetime',
            validation: { required: true },
            placeholder: 'تاریخ پایان',
            model: 'end'
          }
        ]
      }
    ]
  }
})
</script>
