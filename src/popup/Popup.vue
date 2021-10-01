<template>
  <main class="px-4 py-4 text-center text-gray-700 dark:text-gray-200 select-none">
    <div class="flex gap-2 mb-4">
      <img src="/icon-512.png" class="icon-btn h-12" />
      <div class="my-auto text-left">
        <div class="text-xl">
          Doorcat
        </div>
        <div class="opacity-50 leading-2">
          v{{ version }}
        </div>
      </div>
    </div>

    <div class="h-1px w-full bg-gray-400/10"></div>

    <div class="flex flex-col px-2 py-1">
      <h6 class="text-left mt-2 opacity-50 mt-5 mb-0">
        Repos
      </h6>
      <label class="checkbox">
        <input v-model="options.showOwnerName" type="checkbox">
        <span>Show repo owner name</span>
      </label>
      <label class="checkbox">
        <input v-model="options.githubDev" type="checkbox">
        <span>Show button for GitHub.Dev</span>
      </label>
      <h6 class="text-left mt-2 opacity-50 mt-5 mb-0">
        Issues / Pulls
      </h6>
      <label class="checkbox">
        <input v-model="options.showRepoAvatar" type="checkbox">
        <span>Show repo avatar</span>
      </label>
      <label class="checkbox">
        <input v-model="options.pinnedIssueCount" type="checkbox">
        <span>Show pinned count in title</span>
      </label>
      <label class="checkbox">
        <input v-model="options.excludeClosed" type="checkbox">
        <span>Exclude closed issues / pulls</span>
      </label>
      <label class="checkbox">
        <input v-model="options.unpinClosed" type="checkbox">
        <span>Auto unpin closed issues / pulls</span>
      </label>
      <h6 class="text-left mt-2 opacity-50 mt-5 mb-0">
        Account
      </h6>
      <div text="left">
        <button
          text="left xs"
          m="y-2"
          p="x-3 y-1"
          class="bg-gray-400/10 hover:bg-gray-400/20 !outline-none"
          border="~ rounded gray-400/30 hover:gray-400/50"
          @click="setPAT"
        >
          {{ options.accessToken ? 'Change' : 'Set' }} Personal Access Token
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { version } from '../../package.json'
import { options } from '~/options'

useDark()

function setPAT() {
  const pat = prompt('Enter your Personal Access Token:')
  if (pat)
    options.value.accessToken = pat
}
</script>

<style scoped lang="postcss">
input {
  --tw-ring-offset-width: 1px !important;
  --tw-ring-color: #8885 !important;
  --tw-ring-offset-color: transparent !important;
}

.checkbox {
  @apply inline-flex items-center mt-3 cursor-pointer;

  input {
    @apply bg-gray-400/50;
    @apply rounded-md h-4 w-4;
  }

  span {
    @apply ml-2 text-13px opacity-70;
  }
}
</style>
