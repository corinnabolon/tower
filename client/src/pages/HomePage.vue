<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-3 mt-3">
        <EventCard :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js"
import { AppState } from "../AppState.js";

export default {
  setup(){

    onMounted(() => {
      getEvents();
    });

    async function getEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        Pop.error(error)
      }
    }
    
  return {
    events: computed(() => AppState.events)

    }
  }
};
</script>

<style scoped lang="scss">

</style>
