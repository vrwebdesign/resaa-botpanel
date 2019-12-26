<style lang="scss" scoped>
</style>
<template>
  <section>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      fixed: false
    }
  }
})
</script>
