<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.corona_transactions"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import quizAnswer from '@/components/quiz/quizAnswer.vue'
import { ICoronaCity } from '~/models/corona_city'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaTestDetailPage extends Vue {
  date = null
  title = <any>null
  loading = true
  formData = <VRFormData>[]
  item = <any>{
    answers: []
  }
  testsItems: any = []
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    if (this.$route.params.id == 'create') {
      this.title = `افزودن  تراکنش جدید`
    } else {
      this.item = await this.$service.corona_transactions.$get(
        this.$route.params.id
      )
      this.title = `ویرایش  تراکنش {{tracking_code}}`
    }
    // let citiesItems = data.map(item => {
    //   return {
    //     text: item.name,
    //     value: item.id
    //   }
    // })
    this.loading = false
    this.formData = [
      {
        rows: [
          {
            label: 'مبلغ',
            type: 'currency',
            suffix: 'تومان',
            validation: { required: true },
            placeholder: 'مبلغ را وارد نمایید',
            model: 'amount'
          },
          {
            label: 'وضعیت',
            type: 'select',
            validation: { required: true },
            items: this.$enum.corona_transaction_status.toSelect,
            placeholder: 'وضعیت ',
            model: 'status'
          },
          {
            label: 'کد پیگیری',
            type: 'textField',
            model: 'tracking_code'
          },
          {
            label: 'عکس رسید',
            type: 'fileUpload',
            model: 'receipt'
          },
          {
            label: 'توضیحات',
            type: 'textArea',
            placeholder: 'توضیحات ',
            model: 'description'
          }
        ]
      }
    ]
  }
}
</script>
