<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.specialities"
    ></vr-form-generator>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import quizAnswer from '@/components/quiz/quizAnswer.vue'
Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class SpecialityEditPage extends Vue {
  date = null
  title = ''
  loading = true
  formData = <VRFormData>[]
  item = <any>{}
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.$service.specialities.$get(this.$route.params.id)
      this.title = `ویرایش تخصص {{title}}`
      this.loading = false
    } else {
      this.title = 'ایجاد تخصص جدید'
    }
    this.formData = [
      {
        rows: [
          {
            label: 'عنوان',
            type: 'textField',
            validation: { required: true },
            placeholder: 'عنوان را وارد نمایید',
            model: 'title'
          },
          {
            label: 'توضیحات',
            type: 'textField',
            validation: { required: true },
            placeholder: 'توضیحات را وارد نمایید',
            model: 'description'
          }
        ]
      }
    ]
  }
}
</script>
