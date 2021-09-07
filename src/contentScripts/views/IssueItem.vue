<script setup lang="ts">
import type { Issue } from '../types'
import { togglePinnedIssue } from '../issues'
import { issues, pulls } from '../storage'

const props = defineProps<{
  issue: Issue
}>()

const pinned = computed(() =>
  !!pulls.value.pinned.find(i => i.id === props.issue.id)
  || !!issues.value.pinned.find(i => i.id === props.issue.id),
)
</script>

<template>
  <a
    role="menuitem"
    class="dropdown-item doorcat-item"
    :href="`/${issue.repo}/${issue.type}/${issue.number}`"
    style="display: flex;"
  >
    <div style="display: flex; place-content: center; margin: auto 8px auto -5px; font-size: 15px;">
      <template v-if="issue.type === 'pull'">
        <octicon:git-pull-request-16 v-if="issue.state === 'open'" class="open octicon" />
        <octicon:git-pull-request-closed-16 v-else-if="issue.state === 'closed'" class="closed octicon" />
        <octicon:git-merge-16 v-else-if="issue.state === 'merged'" class="merged octicon" />
        <octicon:git-pull-request-draft-16 v-else class="draft octicon" />
      </template>
      <template v-else>
        <octicon:issue-opened-16 v-if="issue.state === 'open'" class="open octicon" />
        <octicon:issue-closed-16 v-else class="closed octicon" />
      </template>
    </div>

    <!-- name -->
    <div style="margin: auto 0; flex: 1 1 auto; display: flex; flex-direction: column; overflow: hidden;">
      <div class="f6 color-text-tertiary" style="margin-bottom: -3px;">{{ issue.repo }} <span>#{{ issue.number }}</span></div>
      <div style="text-overflow: ellipsis; overflow: hidden;">{{ issue.title }}</div>
    </div>

    <!-- pin -->
    <a
      title="Pin"
      class="icon-button"
      style="margin: auto 0; display: flex;"
      @click.prevent="togglePinnedIssue(issue)"
    >
      <mdi:bookmark v-if="pinned" style="margin: auto;" />
      <mdi:bookmark-outline v-else style="margin: auto;" />
    </a>
  </a>
</template>
