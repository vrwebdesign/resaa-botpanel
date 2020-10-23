<template>
  <div class="form-group">
    <label for="">{{ field.label }}</label>
    <div>
      <v-layout
        row
        wrap
        align-center
        class="align-center mb-3"
        v-for="(role, index) in discount_roles"
        :key="index"
      >
        <v-text-field
          outline
          hide-details
          single-line
          v-model="role.count"
          label="تعداد"
        ></v-text-field>
        <vr-currency
          class="mx-3"
          outline
          hide-details
          single-line
          v-model="role.discount"
          label="مبلغ تخفیف به تومان"
          @keypress.enter="addItem"
        ></vr-currency>
        <v-icon color="info" @click="addItem">la-plus</v-icon>
        <v-icon color="error" @click="removeItem(index)" v-if="index > 0"
          >la-times</v-icon
        >
      </v-layout>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

@Component
export default class DiscountRoleComponent extends Vue {
  discount_roles = [{ count: '', discount: '' }]

  @Prop()
  value: any

  @Prop()
  field!: any

  @Watch('discount_roles', {
    deep: true
  })
  discountRoleChangeHandle() {
    this.$emit('input', this.discount_roles)
  }

  @Watch('value', {
    deep: true
  })
  modelChangeHandle(value) {
    if (value && value.length) {
      this.discount_roles = value
    }
  }

  mounted() {
    if (this.value && this.value.length) {
      this.discount_roles = this.value
    }
  }

  addItem($event) {
    this.discount_roles.push({ count: '', discount: '' })
  }

  async removeItem(index) {
    let a = await this.$dialog.confirm()
    if (a) {
      this.discount_roles.splice(index, 1)
    }
  }
}
</script>
