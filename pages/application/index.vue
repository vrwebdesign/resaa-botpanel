<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.application"
        :filters="filters"
        :withRecycle="true"
      >
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.url }}</td>
          <td>{{ item.type | enum('application_type') }}</td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class ApplicationPage extends Vue {
  title = {
    text: 'لیست اپلیکیشن ها',
    icon: 'la-mobile'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '10%' },
    {
      text: 'ورژن',
      align: 'right',
      value: 'version',
      width: '20%'
    },
    { text: 'آدرس فایل', align: 'right', value: 'url', width: '30%' },
    { text: 'نوع', align: 'right', vaue: 'type', width: '20%' },
    {
      text: 'تاریخ ایجاد',
      align: 'right',
      value: 'created_at',
      width: '20%'
    }
  ]
  filters = [
    {
      label: 'آیدی',
      model: 'id:='
    },
    {
      label: 'ورژن',
      model: 'version'
    },
    {
      label: 'نوع',
      type: 'select',
      items: [
        { text: 'همه', value: null },
        ...this.$enum.application_type.toSelect
      ],
      model: 'type'
    }
  ]
  get meta() {
    return { roles: ['administrator', 'application_admin'] }
  }
}
</script>

