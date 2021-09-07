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
        <span class="lang-select__bullet">
          •&nbsp;&nbsp;
        </span>
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
    langs: { type: Array, default: () => [] },
    visible: Boolean
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
        label: this.$t(`langs.${lang}`),
        icon: this.getLangIcon(lang)
      }));
    },
    optionsHeight() {
      if (!this.isExpanded) {
        return '0px';
      }
      const remSize = 10;
      const defaultHeight = 35;
      const itemHeight = this.$refs.item
        ? (this.$refs.item.scrollHeight + 1) / remSize
        : defaultHeight;
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
  },
  watch: {
    visible(v) {
      if (!v) {
        this.hideOptions();
      }
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/theming/theming';
@import '@/assets/scss/responsiveness';

.lang-select {
  &__options {
    transition: height 0.2s;
    overflow: hidden;
    box-sizing: border-box;
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
      @include themed() {
        background-color: t($background-color-lang-select-option);
        transition: background-color $theme-transition;
      }
      &:hover {
        @include themed() {
          background-color: t($background-color-lang-select-option-hover);
        }
      }

      & + .lang-select__item {
        border-top: 1px solid;
        @include themed() {
          border-color: t($border-color);
        }
      }
    }
  }
  &__flag {
    width: 1.8rem;
    margin-right: 0.8rem;
  }
  &__title {
    font-size: 1.4rem;
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }
  &__bullet {
    @include themed() {
      color: t($color);
      transition: color $theme-transition;
    }
  }
}

@include screen-m {
  .lang-select {
    &__title {
      font-size: 1.8rem;
    }
  }
}
</style>
