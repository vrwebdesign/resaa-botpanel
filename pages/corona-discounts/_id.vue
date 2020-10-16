<style lang="scss"></style>

<template>
  <section v-if="title">
    <vr-form-generator
      :title="title"
      :loading="loading"
      :item="item"
      :formData="formData"
      :service="$service.corona_discounts"
    ></vr-form-generator>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import { ICoronaCity } from '~/models/corona_city'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaTestDetailPage extends Vue {
  title = <any>null
  loading = true
  formData = <VRFormData>[]
  item = <any>{
    answers: []
  }
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    if (this.$route.params.id == 'create') {
      this.title = `افزودن  کوپن جدید`
    } else {
      this.item = await this.$service.corona_discounts.$get(
        this.$route.params.id
      )
      this.title = `ویرایش  کوپن {{code}}`
    }

    this.loading = false
    this.formData = [
      {
        rows: [
          {
            label: 'نام',
            type: 'textField',
            validation: { required: true },
            placeholder: 'نام را وارد نمایید',
            model: 'name'
          },
          {
            label: 'مبلغ',
            type: 'currency',
            suffix: 'تومان',
            validation: { required: true },
            placeholder: 'مبلغ را وارد نمایید',
            model: 'amount'
          },

          {
            label: 'کد ',
            type: 'textField',
            validation: { required: true },
            placeholder: 'کد را وارد نمایید',
            model: 'code'
          }
        ]
      }
    ]
  }
}
</script>
