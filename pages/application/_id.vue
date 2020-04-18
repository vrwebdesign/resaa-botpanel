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
      service: this.$service.application,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{}
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.service.$get(this.$route.params.id)
      this.title = `ویرایش ورژن {{version}}`
      this.loading = false
    } else {
      this.title = 'ایجاد ورژن جدید'
    }
    this.formData = [
      {
        rows: [
          {
            label: 'ورژن',
            type: 'textField',
            validation: { required: true },
            placeholder: 'ورژن وارد نمایید',
            model: 'version'
          },
          {
            label: 'فایل خود را آپلود کنید',
            type: 'fileUpload',
            validation: { required: true },
            placeholder: 'فایل را وارد نمایید',
            model: 'url'
          },
          {
            label: 'نوع',
            type: 'select',
            items: this.$enum.application_type.toSelect,
            validation: { required: true },
            placeholder: 'نوع را انتخاب نمایید',
            model: 'type'
          }
        ]
      }
    ]
  }
})
</script>
