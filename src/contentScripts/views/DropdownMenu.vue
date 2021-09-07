<script setup lang="ts">
withDefaults(defineProps<{
  width?: number
}>(), {
  width: 300,
})
</script>

<template>
  <div class="Header-item position-relative d-none d-md-flex">
    <details class="details-overlay details-reset">
      <summary
        class="Header-link"
        aria-label="Dashboard"
        aria-haspopup="menu"
        role="button"
      >
        <slot name="label" /> <span class="dropdown-caret"></span>
      </summary>
      <details-menu class="dropdown-menu dropdown-menu-sw gh-dashboard-menu" :style="{ width: `${width}px` }" role="menu">
        <slot />
      </details-menu>
    </details>
  </div>
</template>

<style lang="postcss">
.gh-dashboard-menu {
  --color-state-hover-primary-bg: rgba(125, 125, 125, 0.15);
}
</style>
