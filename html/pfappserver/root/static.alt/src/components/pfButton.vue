<template>
  <b-button
    ref="pfButton"
    v-bind="$attrs"
    :type="type"
    :variant="variant"
    v-on="forwardListeners"
  >
    <icon name="circle-notch" spin v-if="isLoading"></icon>
    <template v-else>
      <slot>{{ label }}</slot>
    </template>
  </b-button>
</template>

<script>
export default {
  name: 'pf-button',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'button'
    },
    variant: {
      type: String,
      default: 'primary'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: ($event) => {}
    }
  },
  computed: {
    forwardListeners () {
      const { input, ...listeners } = this.$listeners
      return listeners
    }
  }
}
</script>
