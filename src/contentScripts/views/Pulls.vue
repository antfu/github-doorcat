<script setup lang="ts">
import { pulls } from '../storage'
import { getRecent } from '../issues'
import { userid } from '../env'
import { options } from '~/options'

const recent = computed(() => getRecent('pull'))
</script>

<template>
  <DropdownMenu :width="500">
    <template #label>
      Pulls
      <sup
        v-if="pulls.pinned.length && options.pinnedIssueCount"
        style="color: var(--color-success-fg)"
      >{{ pulls.pinned.length }}</sup>
    </template>
    <template #>
      <a
        class="dropdown-item doorcat-item"
        role="menuitem"
        :href="`/pulls?q=is%3Apr+is%3Aopen+author%3A${userid}+archived%3Afalse+sort%3Aupdated-desc`"
      >Pull Requests Created</a>

      <template v-if="pulls.pinned.length">
        <div role="none" class="dropdown-divider"></div>
        <div class="doorcat-subheader">
          Pinned
        </div>
        <IssueItem v-for="i of pulls.pinned" :key="i.id" :issue="i" />
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
