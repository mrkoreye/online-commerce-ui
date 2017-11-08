<template>
<div class="select-container">
  <select @change="handleChange">
    <option 
      v-for="option in options" 
      :key="option.value" 
      :selected="option.value === selected">
      {{ option.name }}
    </option>
  </select>
  <img src="./../assets/caret-dropdown-icon.png" />
</div>
</template>

<script>
import Events from './../event-bus';

export default {
  name: 'SelectDropdown',
  props: [
    'options',
    'selected',
    'changeEventName',
  ],
  methods: {
    handleChange(event) {
      Events.bus.$emit(this.changeEventName, event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.select-container {
  position: relative;
  display: inline-block;
  margin: 0 5px;
  border: 1px solid $button-border-color;
  min-width: 80px;
  border-radius: $border-radius;
  overflow: hidden;
  text-align: left;
  vertical-align: middle;

  img {
    position: absolute;
    width: 13px;
    height: 13px;
    top: 10px;
    right: 14px;
    opacity: 0.6;
    // Sort of a hack, but I'm using a negative z-index here
    // so that the caret renders below the transparent select element
    z-index: -1;
  }

  select {
    width: 100%;
    font-size: 16px;
    padding: 7px 12px;
    color: $base-font-color;
    border: none;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    appearance: none;
    background-color: transparent;

    option {
      font-weight: normal;
      display: block;
      white-space: pre;
      min-height: 1.2em;
      padding: 5px;
    }
  }
}
</style>
