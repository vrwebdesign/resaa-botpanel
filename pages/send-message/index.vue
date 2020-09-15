<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :queryService="getService"
        :service="$service.schedule_messages"
        :withRecycle="true"
        :filters="filters"
      >
        <template #actions_right="{item}">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon depressed text :ripple="false" v-on="on">
                <v-icon @click="send_test(item)">la-paper-plane</v-icon>
              </v-btn>
            </template>
            <span>ارسال تستی</span>
          </v-tooltip>
        </template>
        <template #items="{item}">
          <td>{{ item.text }}</td>
          <td>
            <vr-badge v-if="item.is_send" color="green">ارسال شده</vr-badge>
            <vr-badge v-else color="red">ارسال نشده</vr-badge>
          </td>
          <td>{{ item.success_count || 0 | persianDigit }}</td>
          <td>{{ item.fail_count || 0 | persianDigit }}</td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>
          <td>
            {{
            item.send_time
            | persianDate('jYYYY/jMM/jDD HH:mm:ss')
            | persianDigit
            }}
          </td>
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
export default class SendMessagePage extends Vue {
  title = {
    text: 'لیست ارسال های گروهی',
    icon: 'la-send'
  }
  headers = [
    { text: 'متن', align: 'right', value: 'text', width: '30%' },
    {
      text: 'وضعیت ارسال',
      align: 'right',
      value: 'is_send',
      width: '10%'
    },
    {
      text: 'تعداد موفق',
      align: 'right',
      value: 'success_count',
      width: '10%'
    },
    {
      text: 'تعداد ناموفق',
      align: 'right',
      value: 'fail_count',
      width: '10%'
    },
    {
      text: 'تاریخ ایجاد',
      align: 'right',
      value: 'created_at',
      width: '10%'
    },
    {
      text: 'تاریخ ارسال',
      align: 'right',
      value: 'send_time',
      width: '10%'
    }
  ]
  filters = [
    {
      icon: 'la-search',
      name: 'is_send',
      type: 'select',
      items: [
        { text: 'همه', value: null },
        { text: 'ارسال نشده', value: 0 },
        { text: 'ارسال شده', value: 1 }
      ],
      model: 'is_send',
      label: 'وضعیت'
    }
  ]
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  getService(params) {
    return this.$service.schedule_messages.$query(params)
  }
  async send_test(item) {
    try {
      let chat_id = await this.$dialog
        .title('چت آیدی مورد نظر را وارد نمایید')
        .prompt()
      try {
        let response = await this.$service.schedule_messages.send_test(
          item.id,
          chat_id
        )
        this.$toast.success().showSimple('با موفقیت ارسال شد')
      } catch (error) {
        console.log(error)
        this.$toast.error().showSimple('با مشکل مواجه شد')
      }
    } catch (error) {}
  }
}
</script>
