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
export default Vue.extend({
  data() {
    return {
      date: null,
      title: '',
      service: this.$service.schedule_messages,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{
        profile: {}
      }
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.service.$get(this.$route.params.id)
      this.formData = [
        {
          rows: [
            {
              label: 'عنوان',
              readonly: this.item.is_send,
              type: 'textField',
              placeholder: 'نام را به فارسی وارد نمایید',
              model: 'title'
            },
            {
              label: 'متن',
              readonly: this.item.is_send,
              type: 'textArea',
              placeholder: 'متن پیغام را به فارسی وارد نمایید',
              model: 'text'
            },
            {
              label: 'تاریخ ارسال',
              readonly: this.item.is_send,
              type: 'datePicker',
              // appendIcon: 'event',
              format: 'jYYYY/jMM/jDD HH:mm',
              placeholder: 'تاریخ ارسال را وارد نمایید',
              model: 'send_time'
            }
          ]
        }
      ]
      this.title = `ویرایش پیام {{title}}`
      this.loading = false
    } else {
      this.title = 'ایجاد پیام جدید'
      this.formData = [
        {
          rows: [
            {
              label: 'عنوان',
              type: 'textField',
              placeholder: 'نام را به فارسی وارد نمایید',
              model: 'title'
            },
            {
              label: 'متن',
              type: 'textArea',
              placeholder: 'متن پیغام را به فارسی وارد نمایید',
              model: 'text'
            },
            {
              label: 'تاریخ ارسال',
              type: 'datePicker',
              // appendIcon: 'event',
              format: 'jYYYY/jMM/jDD HH:mm',
              placeholder: 'تاریخ ارسال را وارد نمایید',
              model: 'send_time'
            }
          ]
        }
      ]
    }
  }
})
</script>
