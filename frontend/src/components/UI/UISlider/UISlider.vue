<template>
  <div class="ui-slider splide" ref="slider">
    <div class="ui-slider__arrows splide__arrows">
      <div
        class="ui-slider__arrow ui-slider__arrow_prev splide__arrow splide__arrow--prev"
      >
        <div
          class="ui-slider__arrow-segment ui-slider__arrow-segment_top"
        ></div>
        <div
          class="ui-slider__arrow-segment ui-slider__arrow-segment_bottom"
        ></div>
      </div>
      <div
        class="ui-slider__arrow ui-slider__arrow_next splide__arrow splide__arrow--next"
      >
        <div
          class="ui-slider__arrow-segment ui-slider__arrow-segment_top"
        ></div>
        <div
          class="ui-slider__arrow-segment ui-slider__arrow-segment_bottom"
        ></div>
      </div>
    </div>
    <div class="splide__track">
      <ul class="ui-slider__list splide__list">
        <slot name="slides"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import Splide from '@splidejs/splide';

export default {
  name: 'UISlider',
  mounted() {
    new Splide(this.$refs.slider, {
      perPage: 1,
      gap: '100%',
      classes: {
        pagination: 'ui-slider__pagination_hidden'
      }
    }).mount();
  }
};
</script>

<style lang="scss">
@import '~@splidejs/splide/dist/css/splide-core.min';
@import '~@/assets/scss/theming/theming';
.ui-slider {
  display: flex;

  &:hover {
    .ui-slider {
      &__arrow-segment {
        &_top {
          transform: rotate(-30deg);
        }
        &_bottom {
          transform: rotate(30deg);
        }
      }
    }
  }

  &__pagination {
    &_hidden {
      display: none;
    }
  }

  &__arrows {
    position: absolute;
    top: calc(50% - 2rem);
    left: -2rem;
    width: calc(100% + 4rem);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__arrow {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    cursor: pointer;
    width: 2rem;
    height: 4rem;
    opacity: 0.5;
    transition: opacity $theme-transition;

    &:hover {
      opacity: 1;
    }

    &_prev {
      transform: rotate(180deg);
    }
  }
  &__arrow-segment {
    width: 0.1rem;
    height: 2rem;
    transition: all $theme-transition;
    @include themed() {
      background-color: t($color);
    }
    &_top {
      transform-origin: bottom center;
    }
    &_bottom {
      transform-origin: top center;
    }
  }
}
</style>
