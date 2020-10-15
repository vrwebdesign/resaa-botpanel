<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.corona_orders"
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
      this.item = await this.$service.corona_orders.$get(this.$route.params.id)
      this.title = `ویرایش درخواست تست کرونا {{user_fullname}} {{user_mobile}}`
      let city = this.cities.find(item => item.id == this.item.city_id)
      if (city) {
        let { data } = await this.$service.corona_tests.$query({
          perPage: 1000,
          filters: `["city.id:${city.id}:="]`
        })
        this.testsItems = data
      }
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
            type: 'select',
            validation: { required: true },
            select_text: 'name',
            select_value:'id',
            items: this.testsItems,
            placeholder: 'نوع تست ',
            model: 'test_id'
          },
          {
            label: 'نام و نام خانوادگی',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام و نام خانوادگی را به فارسی وارد نمایید',
            model: 'user_fullname'
          },
          {
            label: 'کد ملی',
            type: 'textField',
            validation: { required: true, nationalCode: true },
            placeholder: 'کد ملی را به فارسی وارد نمایید',
            model: 'user_nationalcode'
          },
          {
            label: 'شماره همراه بیمار',
            type: 'textField',
            validation: { required: true, mobile: true },
            placeholder: 'شماره همراه بیمار را به فارسی وارد نمایید',
            model: 'user_mobile'
          },
          {
            label: 'آدرس بیمار',
            type: 'textArea',
            validation: { required: true },
            placeholder: 'آدرس بیمار را به فارسی وارد نمایید',
            model: 'user_address'
          },
          {
            label: 'مبلغ کل',
            type: 'currency',
            validation: { required: true },
            placeholder: 'مبلغ کل را به تومان وارد نمایید',
            suffix: 'تومان',
            model: 'total_amount'
          },
          {
            label: 'مبلغ پیش پرداخت',
            type: 'currency',
            validation: { required: true },
            placeholder: 'مبلغ پیش پرداخت را به تومان وارد نمایید',
            suffix: 'تومان',
            model: 'prepay_amount'
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
