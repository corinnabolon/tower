<template>
  <div>
    <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }">
      <img :src="eventProp.coverImg" alt="Event Image">
      <p>{{ eventProp.name }}</p>
    </router-link>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent.js";


export default {
  props: { eventProp: { type: TowerEvent, required: true } },

  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
img {
  height: 30vh;
  width: 100%;
  object-fit: cover;
}
</style>