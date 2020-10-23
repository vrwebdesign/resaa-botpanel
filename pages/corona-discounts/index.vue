<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_discounts"
        :filters="filters"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #items="{item}">
          <td>{{ item.id | persianDigit }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.amount | currency | persianDigit }} تومان</td>
          <td>{{ item.code }}</td>
          <td class="text-xs-right" dir="ltr">
            {{
              item.created_at
                | persianDate('jYYYY-jMM-jDD HH:mm')
                | persianDigit
            }}
          </td>
        </template>
        <template #actions_right="{item}">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{
                item.description ? 'la-exclamation' : 'a'
              }}</v-icon>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import colors from '@/colors'
Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaTestPage extends Vue {
  title = {
    text: 'کوپن های تست کرونا',
    icon: 'la-tag'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'نام', align: 'right', value: 'name', width: '10%' },
    { text: 'مبلغ تخفیف', align: 'right', value: 'amount', width: '10%' },
    { text: 'کد', align: 'right', value: 'code', width: '10%' },
    {
      text: 'تاریخ ایجاد',
      align: 'right',
      value: 'created_at',
      width: '10%'
    }
  ]
  filters = [
    {
      label: 'آیدی',
      model: 'id:='
    },
    {
      label: 'نام',
      model: 'name'
    },
    {
      label: 'کد',
      model: 'code'
    }
  ]
  colors = colors
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
}
</script>

