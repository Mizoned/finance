<template>
  <button
      :class="['base-button', `base-button--${color}`]"
      @click="clickHandler"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      test: 'test'
    }
  },
  methods: {
    clickHandler(event) {
      this.$emit('privet', 'Hello World!!!');
    }
  }
}
</script>

<style scoped lang="scss">
  .base-button {
    &--primary {
      background-color: blue;
    }

    &--secondary {
      background-color: grey;
    }

    &--warning {
      background-color: orange;
    }
  }
</style>