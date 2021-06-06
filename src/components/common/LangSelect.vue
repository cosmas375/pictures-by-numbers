<template>
  <UISelect
    :value="value"
    size="mini"
    @input="$emit('input', $event)"
    class="lang-select"
  >
    <UIOption
      v-for="lang in options"
      :key="lang.value"
      :value="lang.value"
      :label="lang.label"
    >
      <div class="lang-select__option-wrap">
        <img :src="lang.icon" :alt="lang.value" class="lang-select__flag" />
        <span class="lang-select__content">{{ lang.label }}</span>
      </div>
    </UIOption>
  </UISelect>
</template>

<script>
export default {
  name: 'LangSelect',
  props: {
    value: { type: String },
    langs: { type: Array, default: () => [] }
  },
  emits: {
    input: null
  },
  computed: {
    options() {
      return this.langs.map(lang => ({
        value: lang,
        label: this.$t(`common.langs.${lang}`),
        icon: require(`@/assets/icons/flags/${lang}.svg`)
      }));
    }
  }
};
</script>

<style lang="scss">
.lang-select {
  &__option-wrap {
    display: flex;
    align-items: center;
  }
  &__flag {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
  }
}
</style>
