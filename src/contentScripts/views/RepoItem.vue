<script setup lang="ts">
import { options, repos } from '../storage'
import { togglePinnedRepo } from '../repos'

const props = defineProps<{
  repo: string
}>()

const pinned = computed(() => repos.value.pinned.includes(props.repo))
</script>

<template>
  <a
    role="menuitem"
    class="dropdown-item doorcat-item"
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
    <div style="margin: auto 0; flex: 1 1 auto; overflow: hidden; text-overflow: ellipsis;">
      <span v-if="options.showOwnerName" style="opacity:0.5">{{ repo.split('/')[0] }}/</span>
      <span style="text-overflow: ellipsis;">{{ repo.split('/')[1] }}</span>
    </div>

    <!-- pin -->
    <a
      title="Pin"
      class="icon-button"
      style="margin: auto 0; display: flex;"
      @click.prevent="togglePinnedRepo(repo)"
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

<style lang="postcss">
.doorcat-item {
  .icon-button {
    opacity: 0;
    color: var(--color-text-primary);
    padding: 4px 2px;
  }

  &:hover .icon-button {
    opacity: 0.5 !important;
  }
  &:hover .icon-button:hover {
    opacity: 1 !important;
  }
}
</style>
