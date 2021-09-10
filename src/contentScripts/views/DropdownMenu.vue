<script setup lang="ts">
withDefaults(defineProps<{
  width?: number
}>(), {
  width: 300,
})
</script>

<template>
  <div class="Header-item position-relative d-none d-md-flex" style="user-select:none;">
    <details class="details-overlay details-reset">
      <summary
        class="Header-link"
        aria-haspopup="menu"
        role="button"
      >
        <slot name="label" /> <span class="dropdown-caret"></span>
      </summary>
      <details-menu class="dropdown-menu dropdown-menu-sw doorcat-menu" :style="{ width: `${width}px` }" role="menu">
        <slot />
      </details-menu>
    </details>
  </div>
</template>

<style lang="postcss">
.doorcat-menu {
  transform: translateX(50%) translateY(5px);
  --color-state-hover-primary-bg: rgba(125, 125, 125, 0.1);

  &::before {
    right: calc(50% - 4px);
  }

  &::after {
    right: calc(50% - 3px);
  }

  & .dropdown-item {
    color: var(--color-text-primary) !important;
  }

  .doorcat-subheader {
    margin: 0 0 5px 10px;
    color: var(--color-text-secondary) !important;
    font-size: 0.9em;
  }
}
</style>
