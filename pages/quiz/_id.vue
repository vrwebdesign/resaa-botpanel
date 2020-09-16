<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.quiz"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import quizAnswer from '@/components/quiz/quizAnswer.vue'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class component_name extends Vue {
  date = null
  title = ''
  loading = true
  formData = <VRFormData>[]
  item = <any>{
    answers: []
  }
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.$service.quiz.$get(this.$route.params.id)
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
              label: 'تاریخ ارسال',
              validation: { required: true },
              disabled: this.item.is_posted == 1 ? true : false,
              type: 'datePicker',
              datePickerType: 'datetime',
              // appendIcon: 'event',
              format: 'jYYYY/jMM/jDD HH:mm',
              placeholder: 'تاریخ ارسال را وارد نمایید',
              model: 'send_time'
            },
            {
              component: quizAnswer,
              model: 'answers'
            }
          ]
        }
      ]
      this.loading = false
      this.title = `ویرایش کویز {{title}}`
    } else {
      this.loading = false
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
              label: 'تاریخ ارسال',
              validation: { required: true },
              type: 'datePicker',
              datePickerType: 'datetime',
              // appendIcon: 'event',
              format: 'jYYYY/jMM/jDD HH:mm',
              placeholder: 'تاریخ ارسال را وارد نمایید',
              model: 'send_time'
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
}
</script>
