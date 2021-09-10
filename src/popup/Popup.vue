<template>
  <main class="px-4 py-4 text-center text-gray-700 dark:text-gray-200 select-none">
    <div class="flex gap-2 mb-4">
      <img src="../../extension/assets/icon-512.png" class="icon-btn h-12" />
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
      <label class="checkbox">
        <input v-model="options.showOwnerName" type="checkbox">
        <span>Show repo owner name</span>
      </label>
      <label class="checkbox">
        <input v-model="options.githubDev" type="checkbox">
        <span>Show button for GitHub.Dev</span>
      </label>
      <label class="checkbox">
        <input v-model="options.excludeClosed" type="checkbox">
        <span>Exclude closed Issues/Pulls</span>
      </label>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { version } from '../../package.json'
import { options } from '~/options'

useDark()
</script>

<style scoped lang="postcss">
input {
  --tw-ring-offset-width: 1px !important;
  --tw-ring-color: #06b6d450 !important;
}

.checkbox {
  @apply inline-flex items-center mt-3 cursor-pointer;

  input {
    @apply rounded-md h-4 w-4 dark:text-cyan-400 text-cyan-500;
  }

  span {
    @apply ml-2 text-13px opacity-70;
  }
}
</style>
