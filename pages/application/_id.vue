<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.application"
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
export default class ApplicationEditPage extends Vue {
  date = null
  title = ''
  loading = true
  formData = <VRFormData>[]
  item = <any>{}
  get meta() {
    return { roles: ['administrator', 'application_admin'] }
  }
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.$service.application.$get(this.$route.params.id)
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
}
</script>
