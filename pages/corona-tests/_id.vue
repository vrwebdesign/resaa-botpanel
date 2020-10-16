<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.corona_tests"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import { ICoronaCity } from '~/models/corona_city'
import DiscountRole from '@/components/corona/discountRole.vue'
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
      this.title = `افزودن  تست کرونا جدید`
    } else {
      this.item = await this.$service.corona_tests.$get(this.$route.params.id)
      this.title = `ویرایش  تست کرونا {{name}}`
      let city = this.cities.find(item => item.id == this.item.city_id)
      if (city) {
        this.testsItems = city.testsItems
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
            label: 'نام تست',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام را وارد نمایید',
            model: 'name'
          },
          {
            label: 'رنگ لیبل',
            type: 'textField',
            placeholder: 'رنگ لیبل را وارد نمایید',
            model: 'color'
          },
          {
            label: 'اولویت',
            type: 'textField',
            validation: { number: true },
            placeholder: 'اولویت را وارد نمایید',
            model: 'sort_order'
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
          },
          {
            label:'تخفیف روی تعداد',
            component:DiscountRole,
            model:'discount_roles'
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
