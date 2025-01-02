<script>
import { supportedLocales } from "../../i18n";

export default {
  methods: {
    onLocaleChange(event) {
      const newLocale = event.target.value;

      if (newLocale !== this.$i18n.locale) {
        this.$router.push({ params: { locale: newLocale } });
      }
    },

    updateLocale(localeCode) {
      if (localeCode !== this.$i18n.locale) {
        this.$router.push({ params: { locale: localeCode } });
      }
    },
  },

  computed: {
    locales() {
      return Object.keys(supportedLocales).map((code) => ({
        code,
        name: supportedLocales[code].name,
        title: supportedLocales[code].name,
        value: code,
      }));
    },
    currentLocale() {
      return this.$i18n.locale;
    },
  },
};
</script>

<template>
  <v-select
    density="compact"
    hide-details="auto"
    variant="solo"
    :items="locales"
    :model-value="currentLocale"
    @update:modelValue="updateLocale"
  ></v-select>
</template>
