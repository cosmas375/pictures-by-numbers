<template>
  <UIDropdown class="lang-select">
    <img
      :src="getLangIcon(value)"
      :alt="value"
      class="lang-select__flag lang-select__flag_toggler"
    />
    <template #dropdown>
      <UIDropdownMenu>
        <UIDropdownItem
          v-for="lang in options"
          :key="lang.value"
          :value="lang.value"
          :label="lang.label"
          @click="selectLang(lang.value)"
        >
          <div class="lang-select__option-wrap">
            <img
              :src="lang.icon"
              :alt="lang.value"
              class="lang-select__flag lang-select__flag_option"
            />
            <span class="lang-select__content">{{ lang.label }}</span>
          </div>
        </UIDropdownItem>
      </UIDropdownMenu>
    </template>
  </UIDropdown>
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
        icon: this.getLangIcon(lang)
      }));
    }
  },
  methods: {
    selectLang(lang) {
      this.$emit('input', lang);
    },
    getLangIcon(lang) {
      return require(`@/assets/svg/flags/${lang}.svg`);
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

    &_toggler {
      width: 2rem;
      height: 2rem;
    }

    &_option {
      margin-right: 1rem;
    }
  }
}
</style>
