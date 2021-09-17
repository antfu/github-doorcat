<script setup lang="ts">
import { repos } from '../storage'
import { togglePinnedRepoIfExists } from '../repos'

const recent = computed(() => repos.value.recent.filter(i => !repos.value.pinned.includes(i)).slice(0, 10))
const inputCustomRepo = ref(false)
const repoName = ref('')
const customPinLoading = ref(false)
const customPinError = ref(false)

async function onValidateCustomPin() {
  if (repoName.value.length === 0 || customPinLoading.value)
    return
  customPinLoading.value = true
  if (await togglePinnedRepoIfExists(repoName.value)) {
    repoName.value = ''
    inputCustomRepo.value = false
    customPinError.value = false
  }
  else {
    customPinError.value = true
  }
  customPinLoading.value = false
}

function CancelCustomPin() {
  repoName.value = ''
  inputCustomRepo.value = false
  customPinError.value = false
  customPinLoading.value = false
}
</script>

<template>
  <DropdownMenu>
    <template #label>
      Repos
    </template>
    <template #>
      <div class="doorcat-subheader flex justify-between" style="display: flex; justify-content: space-between; align-items: center;">
        <span>Pinned</span>
        <button
          v-if="!inputCustomRepo"
          title="Add"
          style="margin-right: 8px;"
          class="icon-button"
          @click="inputCustomRepo = true"
        >
          <mdi:plus-box-outline />
        </button>
        <form v-else style="width: 100%; display: flex; justify-content: flex-end; align-items: center;" @submit.prevent="onValidateCustomPin">
          <input
            id="customRepoName"
            v-model="repoName"
            type="text"
            name="customRepoName"
            title="Repository"
            class="customRepoInput"
            :class="{ 'error': customPinError }"
            @input="customPinError = false"
          >

          <button
            v-if="!customPinLoading"
            type="submit"
            title="Submit"
            class="icon-button"
            :disabled="customPinError"
            :class="{ 'error': customPinError }"
            style="margin-right: 8px;"
          >
            <mdi:check />
          </button>
          <span
            v-else
            title="Loading"
            class="icon-button spinner"
            style="margin-right: 8px;"
          >
            <mdi:loading />
          </span>
          <button
            title="Cancel"
            class="icon-button"
            style="margin-right: 8px;"
            @click="CancelCustomPin"
          >
            <mdi:cancel />
          </button>
        </form>
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

<style lang="postcss">
.customRepoInput {
  flex: 1;
  margin: 0;
  padding: 0;
  margin-left: 8px;
  margin-right: 8px;
  height: 18px;
  &.error {
    border-color: red;
    color: red
  }
}

.spinner {
  display: block;
  -webkit-animation: spin 2s infinite linear;
}

@-webkit-keyframes spin {
  0%  {-webkit-transform: rotate(0deg);}
  100% {-webkit-transform: rotate(360deg);}
}
</style>
