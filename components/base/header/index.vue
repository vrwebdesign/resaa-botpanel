<style lang="scss" scoped>
.v-toolbar__title {
  margin-left: 0;
  margin-right: 20px;
  img {
    max-height: 64px;
  }
}
.nav-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 16px;
  // background: whitesmoke;
  height: 64px;
  .logo {
    img {
      max-height: 64px;
    }
  }
}
.custom-navigation {
  background: linear-gradient(to bottom, #6910e2, #6910e2 64px, #cd36f3);
  z-index: 10;
}
.custom-toolbar {
  background: #fff;
  z-index: 9;
}
</style>

<template>
  <section>
    <v-navigation-drawer
      v-model="drawer"
      dark
      :clipped="clipped"
      :mini-variant="miniVariant"
      class="custom-navigation"
      right
      fixed
      app
    >
      <div class="nav-top">
        <div v-show="!miniVariant" class="logo">
          <img src="~assets/img/logo_white.png" alt />
        </div>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>{{ `chevron_${miniVariant ? 'left' : 'right'}` }}</v-icon>
        </v-btn>
      </div>
      <appNavigation :miniVariant="miniVariant"></appNavigation>
    </v-navigation-drawer>
    <v-toolbar class="custom-toolbar" :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-spacer></v-spacer>
      <v-tooltip bottom transition="fadeLeft">
        <template v-slot:activator="{ on }">
          <v-btn @click="logout" icon v-on="on">
            <v-icon class="la-rotate-180">exit_to_app</v-icon>
          </v-btn>
        </template>
        <span>خروج</span>
      </v-tooltip>
    </v-toolbar>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon light>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import appNavigation from '../navigation/index.vue'
export default Vue.extend({
  components: {
    appNavigation
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,

      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    logout() {
      this.$store.commit('auth/logout')
      this.$router.push('/auth')
    }
  }
})
</script>
