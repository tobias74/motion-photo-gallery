<template>
  <v-container>
    <privacy-de v-if="this.$i18n.locale === 'de'"></privacy-de>
    <privacy-en v-if="this.$i18n.locale === 'en'"></privacy-en>
  </v-container>
</template>

<script>
import PrivacyEn from "@/components/privacy/PrivacyEn.vue";
import PrivacyDe from "@/components/privacy/PrivacyDe.vue";

export default {
  components: { PrivacyEn, PrivacyDe },
};
</script>
  
  