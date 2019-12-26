<template>
  <div class="main-content">
    <component :is="errorPage" :error="error" />
  </div>
</template>

<script>
import error404 from '~/components/error/error404'
import error550 from '~/components/error/error550'
import errorGeneral from '~/components/error/errorGeneral'

export default {
  props: {
    error: {
      type: Object
    }
  },
  mounted() {
    this.$loader.destroy()
  },
  computed: {
    errorPage() {
      if (this.error.statusCode === 404 || this.error.statusCode == 410) {
        return error404
      } else {
        return error550
      }
    }
  }
}
</script>
<style scoped>
.main-content {
  height: 100%;
}
</style>
