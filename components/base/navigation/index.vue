<style lang="scss" >
.navigation-list {
  .v-list__tile--active {
    background: rgba(255, 255, 255, 0.08);
    color: inherit !important;
  }
}
</style>
<template>
  <div class="navigation-list">
    <v-list>
      <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router>
        <v-list-tile-action>
          <v-tooltip v-if="miniVariant" open-delay="0" transition="animated fadeIn" left>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{ item.icon }}</v-icon>
            </template>
            {{item.title}}
          </v-tooltip>
          <v-icon v-else>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.title" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { INav } from '~/models/Navigation'
export default Vue.extend({
  props: {
    miniVariant: {}
  },
  data() {
    return {
      items: <INav[]>[]
    }
  },
  created() {
    let roles = this.$store.getters['auth/role']
    this.items = this.$service.navigation.get(roles)
  }
})
</script>
