<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <p class="fs-3 mb-0 mt-4 text-center">Select a category of event to browse:</p>
      <div class="col-11 theme-pink-bg rounded d-flex mt-4 mb-3">
        <button @click="changeCategory(type)" class="btn btn-success w-100 mx-3 my-2" v-for="type in eventTypes"
          :key="type">
          {{ type }}
        </button>

      </div>
      <div v-for="event in events" :key="event.id" class="col-3 my-4">
        <EventCard :eventProp="event" />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js"
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    let eventTypes = ['All', 'Concert', 'Convention', 'Sport', 'Digital'];
    let filteredType = ref("")

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
      eventTypes,
      filteredType,
      events: computed(() => {
        if (filteredType.value && filteredType.value != "All") {
          return AppState.events.filter(
            (event) => event.type == filteredType.value.toLocaleLowerCase()
          );
        } else {
          return AppState.events;
        }
      }),

      changeCategory(type) {
        logger.log(type);
        filteredType.value = type;
      },

    }
  }
};
</script>

<style scoped lang="scss"></style>
