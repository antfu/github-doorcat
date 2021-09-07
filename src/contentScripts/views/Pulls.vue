<script setup lang="ts">
import { pulls } from '../storage'

defineProps<{
  href: string
}>()

const pinnedIds = computed(() => pulls.value.pinned.map(i => i.id))
const recent = computed(() => pulls.value.recent.filter(i => !pinnedIds.value.includes(i.id)).slice(0, 10))
</script>

<template>
  <DropdownMenu :width="500">
    <template #label>
      Pulls
    </template>
    <template #>
      <a
        class="dropdown-item"
        role="menuitem"
        :href="href"
      >Pull Requests Created</a>

      <template v-if="pulls.pinned.length">
        <div role="none" class="dropdown-divider"></div>
        <div class="doorcat-subheader">Pinned</div>
        <IssueItem v-for="i of pulls.pinned" :key="i.id" :issue="i" />
      </template>

      <template v-if="recent.length">
        <div role="none" class="dropdown-divider"></div>
        <div class="doorcat-subheader">Recent</div>
        <IssueItem v-for="i of recent" :key="i.id" :issue="i" />
      </template>
    </template>
  </DropdownMenu>
</template>
