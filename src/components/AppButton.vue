<template>
  <div
    @click="handleClick"
    class="button">
    {{ text }}
  </div>
</template>

<script>
import Events from './../event-bus';

export default {
  name: 'AppButton',
  props: {
    clickEventName: {
      type: String,
    },

    text: {
      type: String,
    },
  },

  data() {
    return {
      events: Events,
    };
  },

  methods: {
    handleClick() {
      this.events.bus.$emit(this.clickEventName);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.button {
  display: inline-block;
  border: 1px solid $button-border-color;
  border-radius: $border-radius;
  height: $button-height;
  line-height: $button-height;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  margin: 0 6px;

  &.primary {
    background: $primary-color;
    color: white;
    border: 1px solid $primary-color;
  }
}
</style>