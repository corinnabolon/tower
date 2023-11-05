<template>
  <section class="row">
    <div v-if="ticketProp.event.isCanceled == false" class="col-12 my-3 theme-lightgray-bg d-flex rounded">
      <router-link :to="{ name: 'Event', params: { eventId: ticketProp.event.id } }">
        <div class="col-4">
          <img :src="ticketProp.event.coverImg" alt="Event Image" class="event-img rounded m-3">
        </div>
      </router-link>
      <div class="col-7">
        <div class="m-2 me-5">
          <p class="fs-5">{{ ticketProp.event.name }}</p>
          <p>{{ ticketProp.event.location }}</p>
          <p>{{ ticketProp.event.startDate.toLocaleString() }}</p>
          <!-- <p>{{ ticketProp.event.startTime.toLocaleTimeString() }}</p> -->
        </div>
        <div>
          <button @click="deleteTicket(`${ticketProp.id}`)" class="btn btn-danger m-2">Unattend</button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from "../models/Ticket.js";
import Pop from "../utils/Pop.js";
import { ticketsService } from "../services/TicketsService.js";
import { logger } from "../utils/Logger.js";

export default {
  props: { ticketProp: { type: Ticket, required: true } },

  setup() {
    return {
      account: computed(() => AppState.account),

      async deleteTicket(ticketId) {
        try {
          await ticketsService.deleteTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped>
.event-img {
  max-height: 36vh;
  max-width: 60vw;
  object-fit: cover;
  object-position: center;
}
</style>