<script setup lang="ts">
import { issues } from '../storage'

defineProps<{
  href: string
}>()

const recent = computed(() => issues.value.recent.filter(i => i.type === 'issues').slice(0, 10))
</script>

<template>
  <DropdownMenu :width="500">
    <template #label>
      Issues
    </template>
    <template #>
      <a
        class="dropdown-item"
        role="menuitem"
        :href="href"
      >My Issues</a>
      <div role="none" class="dropdown-divider"></div>

      <div class="color-text-secondary" style="margin: 0 0 5px 10px;">
        Recent
      </div>
      <IssueItem v-for="i of recent" :key="i.repo + i.number" :issue="i" />
    </template>
  </DropdownMenu>
</template>
