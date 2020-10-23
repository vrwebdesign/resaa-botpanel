<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_transactions"
        :filters="filters"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #items="{item}">
          <td>{{ item.id | persianDigit }}</td>
          <td>{{ item.amount | currency | persianDigit }} تومان</td>
          <td>
            <vr-badge :color="colors.corona_transaction_status[item.status]">
              {{ item.status | enum('corona_transaction_status') }}
            </vr-badge>
          </td>
          <td>{{ item.tracking_code }}</td>
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
    text: 'تراکنش های تست کرونا',
    icon: 'la-money-bill'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'قیمت', align: 'right', value: 'amount', width: '10%' },

    { text: 'وضعیت', align: 'right', value: 'status', width: '10%' },
    { text: 'کد پیگیری', align: 'right', value: 'tracking_code', width: '10%' },
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
      label: 'وضعیت',
      type: 'select',
      items: [
        { text: 'همه', value: null },
        ...this.$enum.corona_transaction_status.toSelect
      ],
      model: 'status'
    }
  ]
  colors = colors
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
}
</script>

