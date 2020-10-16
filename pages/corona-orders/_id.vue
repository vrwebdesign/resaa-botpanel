<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :beforeSave="beforeSave"
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
  discounts: any[] = []
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    let { data: cities } = await this.$service.corona_city.$query({
      perPage: 1000
    })
    this.cities = cities
    let { data: discounts }: any = await this.$service.corona_discounts.$query({
      perPage: 1000
    })
    this.discounts = discounts

    if (this.$route.params.id == 'create') {
      this.title = `افزودن درخواست تست کرونا جدید`
    } else {
      this.item = await this.$service.corona_orders.$get(this.$route.params.id)
      this.item.selected_discount = this.item.discount
        ? `${this.item.discount.name} ${this.item.discount.amount}`
        : null
      this.item.test_name = this.item.selected_test.name
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
            disabled: Boolean(this.$route.params.id != 'create'),
            select_value: 'id',
            placeholder: 'شهر ',
            model: 'city_id',
            onChange: this.onCityChange
          },
          {
            label: 'تخفیف',
            type: 'select',
            hide: Boolean(this.$route.params.id != 'create'),
            items: this.discounts.map(item => {
              return {
                text: `${item.name} ${item.amount}`,
                value: item.id
              }
            }),
            placeholder: 'تخفیف ',
            model: 'discount_id'
          },
          {
            label: 'نوع تست',
            type: 'select',
            hide: Boolean(this.$route.params.id != 'create'),
            validation: { required: true },
            select_text: 'name',
            select_value: 'id',
            items: this.testsItems,
            placeholder: 'نوع تست ',
            model: 'test_id'
          },
          {
            label: 'تخفیف',
            type: 'textField',
            disabled:true,
            hide: Boolean(this.$route.params.id == 'create'),
            model: 'selected_discount'
          },
          {
            label: 'نوع تست',
            type: 'textField',
            disabled:true,
            hide: Boolean(this.$route.params.id == 'create'),
            validation: { required: true },
            model: 'test_name'
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
            disabled: Boolean(this.$route.params.id != 'create'),
            suffix: 'تومان',
            model: 'total_amount'
          },
          {
            label: 'مبلغ پیش پرداخت',
            type: 'currency',
            validation: { required: true },
            placeholder: 'مبلغ پیش پرداخت را به تومان وارد نمایید',
            disabled: Boolean(this.$route.params.id != 'create'),
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
  async beforeSave(item) {
    item.selected_test = this.testsItems.find(
      testItem => testItem.id == item.test_id
    )
    item.discount = this.discounts.find(
      discount => discount.id == item.discount_id
    )
    return item
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
  async onCityChange(val) {
    let city = this.cities.find(item => item.id == val)
    if (city) {
      let { data } = await this.$service.corona_tests.$query({
        perPage: 1000,
        filters: `["city.id:${city.id}:="]`
      })
      this.testsItems = data
      this.formData[0].rows[3].items = data
    }
  }
}
</script>
