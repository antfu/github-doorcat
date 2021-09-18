<script setup lang="ts">
import { userid } from '../env'
</script>

<template>
  <Repos />
  <Pulls />
  <Issues />
  <a
    href="/trending"
    class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade"
    data-hotkey="g t"
  >Trending</a>
  <a
    class="js-selected-navigation-item Header-link mt-md-n3 mb-md-n3 py-2 py-md-3 mr-0 mr-md-3 border-top border-md-top-0 border-white-fade"
    data-ga-click="Header, click, Nav menu - item:explore"
    data-selected-links="/explore /trending /trending/developers /integrations /integrations/feature/code /integrations/feature/collaborate /integrations/feature/ship showcases showcases_search showcases_landing /explore"
    href="/explore"
  >Explore</a>
</template>
