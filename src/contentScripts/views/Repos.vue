<script setup lang="ts">
import { repos } from '../storage'

const recent = computed(() => repos.value.recent.filter(i => !repos.value.pinned.includes(i)).slice(0, 10))
</script>

<template>
  <DropdownMenu>
    <template #label>
      Repos
    </template>
    <template #>
      <div class="doorcat-subheader">Pinned</div>
      <template v-if="repos.pinned.length">
        <RepoItem
          v-for="i of repos.pinned"
          :key="i"
          :repo="i"
        />
        <div role="none" class="dropdown-divider"></div>
      </template>

      <div class="doorcat-subheader">Recent</div>
      <RepoItem
        v-for="i of recent"
        :key="i"
        :repo="i"
      />
    </template>
  </DropdownMenu>
</template>
