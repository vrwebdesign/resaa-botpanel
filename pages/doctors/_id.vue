<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.doctors"
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
export default class DoctorEditPage extends Vue {
  date = null
  title = <any>null
  loading = true
  formData = <VRFormData>[]
  item = <any>{
    answers: []
  }
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  async mounted() {
    if (this.$route.params.id == 'create') {
      this.title = `افزودن پزشک جدید`
    } else {
      this.item = await this.$service.doctors.$get(this.$route.params.id)
      this.title = `ویرایش پزشک {{first_name}} {{last_name}}`
    }
    let specialities = await this.$service.specialities.$query({
      perPage: 1000
    })
    let speciality_items = specialities.data.map(item => {
      return {
        text: item.title,
        value: item.id
      }
    })
    this.loading = false
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
            label: 'تخصص',
            type: 'autocomplete',
            items: speciality_items,
            model: 'speciality_id'
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
}
</script>
