<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.schedule_messages"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class SendMessageEdit extends Vue {
  date = null
  title = ''
  loading = true
  formData = <VRFormData>[]
  item = <any>{
    profile: {}
  }
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.loading = true
      this.item = await this.$service.schedule_messages.$get(
        this.$route.params.id
      )
      this.formData = [
        {
          rows: [
            {
              label: 'عنوان',
              validation: { required: true },
              disabled: this.item.is_send == 1 ? true : false,
              type: 'textField',
              placeholder: 'نام را به فارسی وارد نمایید',
              model: 'title'
            },
            {
              label: 'متن',
              validation: { required: true },
              disabled: this.item.is_send == 1 ? true : false,
              type: 'textArea',
              placeholder: 'متن پیغام را به فارسی وارد نمایید',
              model: 'text'
            },
            {
              label: 'تاریخ ارسال',
              validation: { required: true },
              disabled: this.item.is_send == 1 ? true : false,
              type: 'datePicker',
              datePickerType: 'datetime',
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
              validation: { required: true },
              type: 'textField',
              placeholder: 'نام را به فارسی وارد نمایید',
              model: 'title'
            },
            {
              label: 'متن',
              validation: { required: true },
              type: 'textArea',
              placeholder: 'متن پیغام را به فارسی وارد نمایید',
              model: 'text'
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
            }
          ]
        }
      ]
    }
  }
}
</script>
