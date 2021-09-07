<script setup lang="ts">
import Item from './Item.vue'
import { recentRepos, pinnedRepos } from './storage'

const recent = computed(() => recentRepos.value.repos.filter(i => !pinnedRepos.value.includes(i)).slice(0, 10))
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
        Repos <span class="dropdown-caret"></span>
      </summary>
      <details-menu class="dropdown-menu dropdown-menu-sw" style="width: 250px" role="menu">
        <!-- Pinned -->
        <template v-if="pinnedRepos.length">
          <Item
            v-for="i of pinnedRepos"
            :key="i"
            :repo="i"
          />
          <div role="none" class="dropdown-divider"></div>
        </template>

        <!-- Recent -->
        <Item
          v-for="i of recent"
          :key="i"
          :repo="i"
        />
      </details-menu>
    </details>
  </div>
</template>
