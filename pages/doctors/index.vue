<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :queryService="getService"
        :service="$service.doctors"
        :filters="filters"
        :withAdd="false"
        :withRecycle="true"
      >
        <template #items="{item}">
          <td>
            <v-avatar size="75" color="grey" class="my-3">
              <img v-if="item.image" :src="item.image.replace('original','thumb')" alt="alt" />
            </v-avatar>
          </td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.subscriber_number }}</td>
          <td>
            <span v-if="item.speciality">{{ item.speciality.title }}</span>
            <span v-else>-</span>
          </td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      title: {
        text: 'لیست پزشکان',
        icon: 'la-user-md'
      },
      headers: [
        {
          text: 'عکس',
          align: 'right',
          sortable: false,
          width: '10%'
        },
        {
          text: 'نام',
          align: 'right',
          value: 'first_name',
          width: '10%'
        },
        {
          text: 'نام خانوادگی',
          align: 'right',
          value: 'last_name',
          width: '20%'
        },
        {
          text: 'کد رسا',
          align: 'right',
          value: 'subscriber_number',
          width: '20%'
        },
        { text: 'تخصص', align: 'right', sortable: false, width: '20%' },
        {
          text: 'تاریخ ایجاد',
          align: 'right',
          value: 'created_at',
          width: '10%'
        }
      ],
      filters: [
        {
          icon: 'la-search',
          name: 'name',
          model: 'first_name',
          label: 'نام پزشک'
        },
        {
          icon: 'la-search',
          name: 'family',
          model: 'last_name',
          label: ' نام خانوادگی پرشک'
        },
        {
          icon: 'la-search',
          name: 'national_code',
          model: 'subscriber_number',
          label: 'کد پزشک'
        },
        {
          icon: 'la-search',
          name: 'speciality',
          model: 'speciality.title',
          label: 'تخصص'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    getService(params) {
      return this.$service.doctors.$query(params)
    }
  }
}
</script>
