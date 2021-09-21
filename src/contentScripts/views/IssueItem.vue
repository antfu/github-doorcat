<script setup lang="ts">
import { togglePinnedIssue, removeIssue } from '../issues'
import { issues, pulls } from '../storage'
import type { Issue } from '~/types'

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
    <div style="display: flex; place-content: center; margin: auto 8px auto -5px; font-size: 16px;">
      <IssueState :issue="issue" />
    </div>

    <!-- name -->
    <div
      style="margin: auto 0; flex: 1 1 auto; display: flex; flex-direction: column; overflow: hidden;"
    >
      <div class="f6" style="margin-bottom: -3px; opacity: 0.7;">
        {{ issue.repo }}
        <span>#{{ issue.number }}</span>
      </div>
      <div style="text-overflow: ellipsis; overflow: hidden;">{{ issue.title }}</div>
    </div>

    <!-- pin -->
    <button
      title="Pin"
      class="icon-button"
      style="margin: auto 0; display: flex;"
      @click.prevent="togglePinnedIssue(issue)"
    >
      <mdi:bookmark v-if="pinned" style="margin: auto;" />
      <mdi:bookmark-outline v-else style="margin: auto;" />
    </button>

    <button
      title="Remove"
      class="icon-button"
      style="margin: auto 0; display: flex;"
      @click.prevent="removeIssue(issue)"
    >
      <mdi:close style="margin: auto;" />
    </button>
  </a>
</template>
