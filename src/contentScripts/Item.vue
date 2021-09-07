<script setup lang="ts">
import { options, pinnedRepos } from './storage'

const props = defineProps<{
  repo: string
}>()

const pinned = computed(() => pinnedRepos.value.includes(props.repo))

function toggle(e: MouseEvent) {
  e.stopImmediatePropagation()
  e.preventDefault()

  if (!pinned.value)
    pinnedRepos.value.push(props.repo)
  else
    pinnedRepos.value = pinnedRepos.value.filter(x => x !== props.repo)
}
</script>

<template>
  <a
    role="menuitem"
    class="dropdown-item gh-dashboard-item"
    :href="`/${repo}`"
    style="display: flex;"
  >
    <!-- avatar -->
    <img
      v-if="options.showAvatar"
      class="avatar avatar-user"
      :src="`/${repo.split('/')[0]}.png`"
      style="width: 22px; height: 22px; vertical-align: middle; margin: auto 10px auto -5px"
    />

    <!-- name -->
    <div style="margin: auto 0; flex: 1 1 auto;">
      <span v-if="options.showOwnerName" style="opacity:0.5">{{ repo.split('/')[0] }}/</span>
      <span>{{ repo.split('/')[1] }}</span>
    </div>

    <!-- pin -->
    <a
      title="Pin"
      class="icon-button"
      style="margin: auto 0; display: flex;"
      @click="toggle"
    >
      <mdi:bookmark v-if="pinned" style="margin: auto;" />
      <mdi:bookmark-outline v-else style="margin: auto;" />
    </a>

    <!-- github.dev -->
    <a
      v-if="options.githubDev"
      title="Open in github.dev"
      class="icon-button"
      :href="`https://github.dev/${repo}`"
      target="_blank"
      style="margin: auto 0; display: flex;"
    >
      <mdi-microsoft-visual-studio-code style="margin: auto;" />
    </a>
  </a>
</template>

<style scoped lang="postcss">
.gh-dashboard-item {
  .icon-button {
    opacity: 0;
    color: #ffffff80;
    padding: 4px 2px;

    &:hover {
      color: #fff;
    }
  }

  &:hover .icon-button {
    opacity: 1;
  }
}
</style>
