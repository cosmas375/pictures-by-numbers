<template>
  <div class="lang-select">
    <div
      @click="onTogglerClick"
      class="lang-select__item lang-select__item_toggler"
      ref="item"
    >
      <img :src="getLangIcon(value)" :alt="value" class="lang-select__flag" />
      <span class="lang-select__title">{{ selectedLang.label }}</span>
    </div>
    <div class="lang-select__options" :style="{ height: optionsHeight }">
      <div
        v-for="lang in options"
        :key="lang.value"
        @click="selectLang(lang.value)"
        class="lang-select__item lang-select__item_option"
      >
        <img :src="lang.icon" :alt="lang.value" class="lang-select__flag" />
        <span class="lang-select__title">{{ lang.label }}</span>
      </div>
    </div>
  </div>
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
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    selectedLang() {
      return this.options.find(lang => lang.value === this.value);
    },
    options() {
      return this.langs.map(lang => ({
        value: lang,
        label: this.$t(`common.langs.${lang}`),
        icon: this.getLangIcon(lang)
      }));
    },
    optionsHeight() {
      if (!this.isExpanded) {
        return '0px';
      }
      const remSize = 10;
      const itemHeight = (this.$refs.item.scrollHeight + 1) / remSize;
      return `${Math.min(this.langs.length, 3.5) * itemHeight}rem`;
    }
  },
  methods: {
    onTogglerClick() {
      this.isExpanded ? this.hideOptions() : this.showOptions();
    },
    showOptions() {
      this.isExpanded = true;
    },
    hideOptions() {
      this.isExpanded = false;
    },
    selectLang(lang) {
      this.$emit('input', lang);
      this.hideOptions();
    },
    getLangIcon(lang) {
      return require(`@/assets/svg/flags/${lang}.svg`);
    }
  }
};
</script>

<style lang="scss">
.lang-select {
  &__options {
    background-color: rgb(234, 234, 234);
    transition: height 0.2s;
    overflow: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    cursor: pointer;

    &__toggler {
      box-shadow: 0 0.4rem 2rem black;
    }

    &_option {
      &:hover {
        background-color: rgb(207, 207, 207);
      }

      & + .lang-select__item {
        border-top: 1px solid #c0c4cc;
      }
    }
  }
  &__flag {
    width: 1.8rem;
    margin-right: 0.8rem;
  }
  &__title {
    font-size: 1.4rem;

    @media screen and(max-width: 768px) {
      font-size: 1.8rem;
    }
  }
}
</style>
