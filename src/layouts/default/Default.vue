<template>
  <default-bar />

  <default-view />

  <v-footer color="primary" class="text-center d-flex flex-column flex-grow-0">
    <v-row justify="center" no-gutters>
      <localized-link class="text-white mx-3" v-for="link in links" :key="link" color="white" :to="link.url">{{
        $t(link.translationKey)
      }}</localized-link>
    </v-row>
  </v-footer>
</template>

<script setup>
import LocalizedLink from "@/components/i18n/LocalizedLink.vue";
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
</script>

<script>
export default {
  components: { LocalizedLink },
  data: () => ({
    links: [
      { url: "imprint", translationKey: "imprint" },
      { url: "privacy", translationKey: "privacy" },
    ],
  }),
};
</script>
