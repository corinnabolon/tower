<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <PostCommentModal />
  <CreateEventOffCanvas />
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'


export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

:root {
  --main-height: calc(100vh - 32px - 64px);
  --theme-gray: #191825;
  --theme-lightgray: #5f4268;
  --theme-purple: #5800FF;
  --theme-pink: #E900FF;
  --theme-yellow: #FFC600;
}

body {
  background-color: var(--theme-gray);
  color: whitesmoke;
  font-family: 'Montserrat', sans-serif;
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.btn {
  font-weight: bold;
}

.theme-gray-bg {
  background-color: var(--theme-gray);
}

.theme-purple-bg {
  background-color: var(--theme-purple);
}

.theme-pink-bg {
  background-color: var(--theme-pink);
}

.theme-lightgray-bg {
  background-color: var(--theme-lightgray);
}

.btn-theme-yellow {
  background-color: var(--theme-yellow);
}

.btn-theme-yellow:hover {
  border: 1px solid var(--theme-lightgray);
  color: var(--theme-gray);
  background-color: var(--theme-yellow);
}
</style>
