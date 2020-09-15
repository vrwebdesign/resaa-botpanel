<style lang="scss">
.navigation-list {
  .v-list__tile--active {
    background: rgba(255, 255, 255, 0.08);
    color: inherit !important;
  }
  .v-list__group__header__prepend-icon {
    .v-icon {
      color: #fff !important;
    }
  }
  .active {
    transform: rotate(-180deg);
  }
}
</style>
<template>
  <div class="navigation-list">
    <v-list>
      <div v-for="(item, i) in items" :key="i">
        <v-list-tile v-if="!item.child" :to="item.to" router>
          <v-list-tile-action>
            <v-tooltip v-if="miniVariant" open-delay="0" transition="animated fadeIn" left>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">{{ item.icon }}</v-icon>
              </template>
              {{ item.title }}
            </v-tooltip>
            <v-icon v-else>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="item.title" />
        </v-list-tile>
        <v-list-group v-else :key="i" no-action :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="subMenu in item.child" :to="subMenu.to" :key="subMenu.title">
            <v-list-tile-action>
              <v-tooltip v-if="miniVariant" open-delay="0" transition="animated fadeIn" left>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">{{ subMenu.icon }}</v-icon>
                </template>
                {{ subMenu.title }}
              </v-tooltip>
              <v-icon v-else>{{ subMenu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="subMenu.title" />
          </v-list-tile>
        </v-list-group>
      </div>
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
      isActive: false,
      items: <INav[]>[]
    }
  },
  created() {
    let roles = this.$store.getters['auth/role']
    this.items = this.$service.navigation.get(roles)
  }
})
</script>
