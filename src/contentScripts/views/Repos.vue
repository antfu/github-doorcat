<script setup lang="ts">
import { repos } from '../storage'
import { togglePinnedRepoIfExists } from '../repos'

const recent = computed(() => repos.value.recent.filter(i => !repos.value.pinned.includes(i)).slice(0, 10))

async function promptForCustomRepo() {
  const input = prompt('Enter the repo id:')
  if (!input)
    return
  if (!await togglePinnedRepoIfExists(input))
    alert(`repo "${input}" does not exist`)
}
</script>

<template>
  <DropdownMenu>
    <template #label>
      Repos
    </template>
    <template #>
      <div class="doorcat-subheader" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Pinned</span>
        <button
          title="Add"
          style="margin-right: 8px;"
          class="icon-button"
          @click="promptForCustomRepo"
        >
          <mdi:plus />
        </button>
      </div>
      <template v-if="repos.pinned.length">
        <RepoItem
          v-for="i of repos.pinned"
          :key="i"
          :repo="i"
        />
        <div role="none" class="dropdown-divider"></div>
      </template>

      <div class="doorcat-subheader">
        Recent
      </div>
      <RepoItem
        v-for="i of recent"
        :key="i"
        :repo="i"
      />
    </template>
  </DropdownMenu>
</template>
