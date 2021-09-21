<script setup lang="ts">
import type { Issue } from '~/types'

defineProps<{ issue: Issue }>()
</script>

<template>
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
</template>
