<style lang="scss">
.box-wrapper {
  padding: 0 36px;
  margin-top: 20px;
  .form-section .form-group > label {
    flex: 0 0 33%;
  }
}
.box {
  box-shadow: 0 0 9px -4px #78909c;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  overflow: hidden;
  &-header {
    background: #78909c;
    margin: -16px -16px 16px -16px;
    padding: 8px 16px;
    font-size: 18px;
  }
}
</style>

<template>
  <v-card ref="editItem" id="editItem">
    <div>
      <div class="header sticky">
        <div class="head-lable">
          <h3>{{ title }}</h3>
        </div>
        <div class="head-toolbar">
          <div class="btn-group">
            <v-btn @click="save" class="action-btn" depressed color="info"
              >ذخیره</v-btn
            >
          </div>
        </div>
      </div>
      <div ref="loaderWrapper" class="content">
        <v-layout row wrap>
          <v-flex lg2></v-flex>
          <v-flex lg8 xs12>
            <section class="form-section">
              <div class="form-group">
                <v-checkbox
                  label="فعال / غیرفعال"
                  v-model="item.is_active"
                ></v-checkbox>
              </div>
              <div class="form-group">
                <label class="required">زمان ارسال بعد از ثبت سفارش</label>
                <v-text-field
                  outline
                  v-validate="{ required: true, min_value: 1 }"
                  :error-messages="errors.collect('minute')"
                  data-vv-as="تعداد دقیقه"
                  name="minute"
                  v-model="item.minute"
                  suffix="دقیقه"
                  placeholder="زمان سپری شده بعد از ثبت سفارش"
                  hint="زمان سپری شده بعد از ثبت سفارش به دقیقه"
                ></v-text-field>
              </div>
              <div class="form-group">
                <label class="required">کد تخفیف</label>
                <v-select
                  :items="discounts"
                  item-text="name"
                  item-value="id"
                  outline
                  v-validate="'required'"
                  :error-messages="errors.collect('discount')"
                  data-vv-as="کد تخفیف"
                  name="discount"
                  single-line
                  v-model="item.discount_id"
                  placeholder="کد تخفیف را مشخص کنید"
                ></v-select>
              </div>
            </section>
          </v-flex>
          <v-flex lg2></v-flex>
        </v-layout>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { VRFormData } from 'vrwebdesign-nuxt/modules/nuxt-form-generator'
import quizAnswer from '@/components/quiz/quizAnswer.vue'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaTestDetailPage extends Vue {
  date = null
  loading = true
  title = 'تنظیمات ارسال پیامک ریتارگتینگ'
  item: any = {}
  discounts: any = []
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    this.item = await this.$service.corona_retarget.getSetting()
    let { data } = await this.$service.corona_discounts.$query({
      perPage: 1000
    })
    this.discounts = data
    this.loading = false
  }

  async save() {
    let valid = await this.$validator.validateAll()
    if (!valid) {
      return
    }
    this.loading = true
    try {
      await this.$service.corona_retarget.changeSetting(this.item)
      await this.$toast
        .success()
        .timeout(400)
        .showSimple('با موفقیت ذخیره شد')
    } catch (error) {
      await this.$toast.error().showSimple('خطایی رخ داده است')
    }
  }
}
</script>
