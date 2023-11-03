<template>
  <div>
    <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }">
      <div class="eventCardImg rounded">
        <p class="eventCard-title text-center">{{ eventProp.name }}</p>
        <div v-if="eventProp.isCanceled" class="d-flex cancelled align-items-center justify-content-center">
          <p class="mb-1">Cancelled</p>
        </div>
        <div v-else-if="(eventProp.capacity - eventProp.ticketCount) <= 0"
          class="d-flex cancelled sold-out align-items-center justify-content-center">
          <p class="mb-1">Sold Out</p>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from "../models/TowerEvent.js";


export default {
  props: { eventProp: { type: TowerEvent, required: true } },

  setup(props) {
    return {
      eventCoverImg: computed(() => `url(${props.eventProp.coverImg})`),
    }
  }
};
</script>


<style lang="scss" scoped>
.eventCardImg {
  background-image: v-bind(eventCoverImg);
  background-size: cover;
  background-position: center;
  height: 30vh;
  width: 90%;
}

.eventCard-title {
  color: whitesmoke;
  font-weight: bold;
  font-size: 16pt;
  background-color: #0000007a;
  backdrop-filter: blur(15px);
  margin: 0px;
  padding: 0px;
  width: 101%;
}

.cancelled {
  font-size: 24pt;
  height: 82%;
  width: 101%;
  color: red;
  background-color: #0000007a;
  backdrop-filter: blur(5px);
  text-shadow: 2px 2px 3px black, 2px 2px 3px black, 2px 2px 3px black;
}

.sold-out {
  color: blue;
}

.img-shadow {
  border: 1px solid var(--theme-yellow);
  transition: ease-in-out 0.275s;
}

.img-shadow:hover {
  box-shadow: 0px 0px 15px var(--theme-yellow);
}
</style>