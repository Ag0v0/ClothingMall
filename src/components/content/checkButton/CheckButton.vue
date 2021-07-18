<template>
  <div class="check-button">
    <span
      class="iconfont"
      :class="{
        'icon-not-selected': !isSelected,
        'icon-selected': isSelected,
      }"
    >
    </span>
    <slot name="checktext"></slot>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isSelected: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-button .iconfont {
  font-size: 22px;
  margin-right: 5px;
}
.icon-not-selected {
  color: #aaa;
}
.icon-selected {
  color: var(--color-light-text);
}


</style>