<template>
  <nav class="navbar navbar-expand-lg theme-purple-bg px-3">
    <p class="tower"><i class="mdi mdi-chess-rook"></i></p>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <p class="fw-bold">Home</p>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <button v-if="account.id" class="btn btn-success" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#create-event-off-canvas" aria-controls="create-event-off-canvas">
            Post an Event
          </button>
          <!-- <router-link :to="{ name: 'CreateEventOffCanvas' }" class="btn text-success lighten-30 selectable text-uppercase">
            Post an Event!
          </router-link> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
import { AppState } from '../AppState';
import { computed } from 'vue';

export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

a:hover {
  text-decoration: none;
}

.tower {
  font-size: 24pt;
  color: var(--theme-yellow);
  text-shadow: 2px 2px 3px black, 2px 2px 3px black, 2px 2px 3px black;
  margin-right: 20px;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
