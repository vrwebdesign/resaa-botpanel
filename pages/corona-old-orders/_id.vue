<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.corona_old_orders"
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
  cities: ICoronaCity[] = []
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    let { data } = await this.$service.corona_city.$query({ perPage: 1000 })
    this.cities = data
    if (this.$route.params.id == 'create') {
      this.title = `افزودن درخواست تست کرونا جدید`
    } else {
      this.item = await this.$service.corona_old_orders.$get(this.$route.params.id)
      this.item.test_name = this.item.selected_test.name
      this.title = `ویرایش درخواست تست کرونا {{name}} {{mobile}}`
      let city = this.cities.find(item => item.id == this.item.city_id)
      if (city) {
        this.testsItems = city.testsItems
      }
    }
    this.loading = false
    this.formData = [
      {
        rows: [
          {
            label: 'وضعیت',
            type: 'select',
            validation: { required: true },
            items: this.$enum.corona_test_status.toSelect,
            placeholder: 'وضعیت',
            model: 'status'
          },
          {
            label: 'شهر',
            type: 'select',
            validation: { required: true },
            items: this.cities,
            select_text: 'name',
            select_value: 'id',
            placeholder: 'شهر ',
            model: 'city_id',
            onChange: this.onCityChange
          },
          {
            label: 'نوع تست',
            type: 'textField',
            hide:!this.item.test_name,
            placeholder: 'نوع تست ',
            model: 'test_name'
          },
          {
            label: 'نام و نام خانوادگی',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام و نام خانوادگی را به فارسی وارد نمایید',
            model: 'name'
          },
          {
            label: 'کد ملی',
            type: 'textField',
            validation: { required: true, nationalCode: true },
            placeholder: 'کد ملی را به فارسی وارد نمایید',
            model: 'nationalCode'
          },
          {
            label: 'علائم',
            type: 'autocomplete',
            validation: { required: true },
            chips: true,
            items: [
              { text: 'تب', value: 'تب' },
              { text: 'لرز', value: 'لرز' },
              { text: 'سر درد', value: 'سر درد' },
              { text: 'اسهال', value: 'اسهال' },
              { text: 'استفراغ', value: 'استفراغ' },
              { text: 'گلو درد', value: 'گلو درد' },
              { text: 'سرفه', value: 'سرفه' },
              { text: 'تنگی نفس', value: 'تنگی نفس' },
              { text: 'درد عضلات', value: 'درد عضلات' },
              { text: 'ضعف حس بویایی', value: 'ضعف حس بویایی' },
              { text: 'ضعف حس چشایی', value: 'ضعف حس چشایی' }
            ],
            multiple: true,
            placeholder: 'علائم',
            model: 'symptoms'
          },

          {
            label: 'شماره همراه بیمار',
            type: 'textField',
            validation: { required: true, mobile: true },
            placeholder: 'شماره همراه بیمار را به فارسی وارد نمایید',
            model: 'mobile'
          },
          {
            label: 'شماره همراه رسا',
            type: 'textField',
            validation: { required: true, mobile: true },
            placeholder: 'شماره همراه رسا را به فارسی وارد نمایید',
            model: 'phoneNumber'
          },
          {
            label: 'آدرس بیمار',
            type: 'textArea',
            validation: { required: true },
            placeholder: 'آدرس بیمار را به فارسی وارد نمایید',
            model: 'address'
          },
          {
            label: 'قیمت',
            type: 'currency',
            validation: { required: true },
            placeholder: 'قیمت را به تومان وارد نمایید',
            suffix: 'تومان',
            model: 'amount'
          },
          {
            label: 'وضعیت پرداخت',
            type: 'select',
            validation: { required: true },
            items: this.$enum.corona_transaction_status.toSelect,
            placeholder: 'وضعیت پرداخت ',
            model: 'payment_status'
          },
          {
            label: 'کد پیگیری پرداخت',
            type: 'textField',
            placeholder: 'کد پیگیری پرداخت ',
            model: 'chargeRequestId'
          },
          {
            label: 'کد پیگیری درگاه',
            type: 'textField',
            placeholder: 'کد پیگیری درگاه ',
            model: 'trackingNumber'
          },
          {
            label: 'رسید کارت به کارت',
            type: 'fileUpload',
            model: 'trackingImage'
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
  getCities(val) {
    if (val && val != '') {
      if (this.item.city_id) {
        return this.$service.corona_city
          .$query({ filters: `["id:${this.item.city_id}:="]` })
          .then(res => {
            return res.data.map(item => {
              return {
                text: item.name,
                value: item.id
              }
            })
          })
      }
      return this.$service.corona_city.$query().then(res => {
        return res.data.map(item => {
          return {
            text: item.name,
            value: item.id
          }
        })
      })
    } else {
      return this.$service.corona_city
        .$query({ filters: `["name:${val}:like"]` })
        .then(res => {
          return res.data.map(item => {
            return {
              text: item.name,
              value: item.id
            }
          })
        })
    }
  }
  onCityChange(val) {
    let city = this.cities.find(item => item.id == val)
    if (city) {
      this.formData[0].rows[2].items = city.testsItems
    }
  }
}
</script>
