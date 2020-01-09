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
      service: this.$service.quiz,
      loading: this.$route.params.id ? false : true,
      formData: <VRFormData>[],
      item: <any>{
        answers: []
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
              type: 'textField',
              validation: { required: true },
              placeholder: 'نام را به فارسی وارد نمایید',
              model: 'title'
            },
            {
              label: ' متن سوال',
              type: 'textArea',
              validation: { required: true },
              placeholder: 'متن سوال را به فارسی وارد نمایید',
              model: 'question'
            },
            {
              label: ' عکس کوییز',
              type: 'fileUpload',
              validation: { required: true },
              placeholder: 'عکس کوییز را به فارسی وارد نمایید',
              model: 'image'
            },
            {
              component: quizAnswer,
              model: 'answers'
            }
          ]
        }
      ]
      this.title = `ویرایش کویز {{title}}`
      this.loading = false
    } else {
      this.title = 'ایجاد کویز جدید'
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
              label: ' متن سوال',
              type: 'textArea',
              placeholder: 'متن سوال را به فارسی وارد نمایید',
              model: 'question'
            },
            {
              label: ' عکس کوییز',
              type: 'fileUpload',
              validation: { required: true },
              placeholder: 'عکس کوییز را به فارسی وارد نمایید',
              model: 'image'
            },
            {
              component: quizAnswer,
              model: 'answers'
            }
          ]
        }
      ]
    }
  }
})
</script>
