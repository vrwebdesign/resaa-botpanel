<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_city"
        :filters="filters"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ +item.testsItems[0].price | currency | persianDigit}} تومان</td>
          <td>{{ +item.testsItems[1].price | currency | persianDigit}} تومان</td>
          <td>{{ +item.testsItems[2].price | currency | persianDigit}} تومان</td>
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
    text: 'شهر ها',
    icon: 'la-city'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'نام شهر', align: 'right', value: 'name', width: '10%' },
    {
      text: 'قیمت تست antybody',
      align: 'right',
      sortable: false,
      width: '10%'
    },
    {
      text: 'قیمت تست pcr',
      align: 'right',
      sortable: false,
      width: '10%'
    },
    {
      text: 'قیمت تست هر۲',
      align: 'right',
      sortable: false,
      width: '10%'
    },

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
      label: 'نام شهر',
      model: 'name'
    }
  ]
  colors = colors
  get ExportExcel() {
    let token = this.$store.getters['auth/token']
    let url = `${window.location.origin}/api/admin/corona_test/exportExcel?token=${token}`
    return url
  }
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  exportExcel() {
    this.$service.corona_test.exportExcel()
  }
}
</script>

