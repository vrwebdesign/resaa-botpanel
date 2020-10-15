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
          <v-btn flat color="accent" @click="goBack">
            <span>بازگشت</span>
            <v-icon class="pr-2"> la-arrow-left </v-icon>
          </v-btn>
        </div>
      </div>
      <div ref="loaderWrapper" class="content">
        <v-layout row wrap>
          <v-flex lg2></v-flex>
          <v-flex lg8 xs12>
            <section class="form-section">
              <div class="form-group">
                <label class="required">نام شهر</label>
                <v-text-field
                  outline
                  v-validate="{ required: true }"
                  :error-messages="errors.collect('name')"
                  data-vv-as="نام شهر"
                  name="name"
                  v-model="item.name"
                  placeholder="نام شهر را وارد نمایید"
                ></v-text-field>
              </div>
              <div class="form-group">
                <label >اولویت</label>
                <v-text-field
                  outline
                  v-validate="'number'"
                  :error-messages="errors.collect('sort_order')"
                  data-vv-as="اولویت"
                  name="sort_order"
                  v-model="item.sort_order"
                  placeholder="اولویت نمایش را مشخص کنید"
                ></v-text-field>
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
  title = 'افزودن شهر جدید'
  item: any = {}
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  async mounted() {
    if (this.$route.params.id !== 'create') {
      this.item = await this.$service.corona_city.$get(this.$route.params.id)
      this.title = `ویرایش شهر ${this.item.name}`
    }
    this.loading = false
  }

  async save() {
    let valid = await this.$validator.validateAll()
    if (!valid) {
      return
    }
    try {
      if (this.$route.params.id == 'create') {
        await this.$service.corona_city.$save(this.item)
      } else {
        await this.$service.corona_city.$update(
          this.$route.params.id,
          this.item
        )
      }
      await this.$toast
        .success()
        .timeout(400)
        .showSimple('با موفقیت ذخیره شد')
      this.goBack()
    } catch (error) {
      await this.$toast.error().showSimple('خطایی رخ داده است')
    }
  }
  goBack() {
    return this.$router.push('/corona-cities')
  }
}
</script>
