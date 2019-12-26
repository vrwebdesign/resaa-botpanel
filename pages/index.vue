<style lang="scss"></style>
<template>
  <section>
    <dashboard />
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import dashboard from '~/components/dashboard/index.vue'
export default Vue.extend({
  components: {
    dashboard
  }
})
</script>
