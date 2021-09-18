<script setup lang="ts">
import { issues } from '../storage'
import { getRecent } from '../issues'
import { useid } from '../env'

const recent = computed(() => getRecent('issues'))
</script>

<template>
  <DropdownMenu :width="500">
    <template #label>
      Issues
    </template>
    <template #>
      <a
        class="dropdown-item doorcat-item"
        role="menuitem"
        :href="`/issues?q=is%3Apr+is%3Aopen+author%3A${userid}+archived%3Afalse+sort%3Aupdated-desc`"
      >Issues Created</a>

      <template v-if="issues.pinned.length">
        <div role="none" class="dropdown-divider"></div>
        <div class="doorcat-subheader">
          Pinned
        </div>
        <IssueItem v-for="i of issues.pinned" :key="i.id" :issue="i" />
      </template>

      <template v-if="recent.length">
        <div role="none" class="dropdown-divider"></div>
        <div class="doorcat-subheader">
          Recent
        </div>
        <IssueItem v-for="i of recent" :key="i.id" :issue="i" />
      </template>
    </template>
  </DropdownMenu>
</template>
