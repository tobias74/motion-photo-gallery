<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <localized-link :to="''"
        ><span class="text-white font-weight-medium">motionphoto.</span><span class="text-white font-weight-light">gallery</span>
      </localized-link>
    </v-toolbar-title>

    <template v-slot:append>
      <locale-switcher />
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list density="compact" nav>
      <v-list-item
        :active="isActive('/' + $i18n.locale + '/')"
        :href="'/' + $i18n.locale + '/'"
        prepend-icon="mdi-view-dashboard"
        :title="$t('Extract MotionPhotos')"
        value="home"
      >
      </v-list-item>

      <v-list-item prepend-icon="mdi-file-image" :title="$t('PSD Thumbnails')" value="psd_viewer" :href="'/' + $i18n.locale + '/psd'"></v-list-item>

      <v-divider></v-divider>

      <v-list-item
        :active="isActive('/' + $i18n.locale + '/privacy')"
        :href="'/' + $i18n.locale + '/privacy'"
        prepend-icon="mdi-key"
        :title="$t('privacy')"
        value="privacy"
      >
      </v-list-item>

      <v-list-item
        :active="isActive('/' + $i18n.locale + '/imprint')"
        :href="'/' + $i18n.locale + '/imprint'"
        prepend-icon="mdi-card-text"
        :title="$t('imprint')"
        value="imprint"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
//

import LocaleSwitcher from "@/components/i18n/LocaleSwitcher.vue";
import LocalizedLink from "@/components/i18n/LocalizedLink.vue";
</script>

<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
  components: { LocaleSwitcher, LocalizedLink },
  methods: {
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
