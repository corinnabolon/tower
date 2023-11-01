<template>
  <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
      <!-- ////SECTION top box which shows all the event info -->
      <div class="col-9 theme-pink-bg mt-3 rounded">
        <section class="row">
          <div class="col-4">
            <img :src="event.coverImg" alt="Event Image" class="container-fluid my-3">
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <div>
                <p class="fs-1 mb-0">{{ event.name }}</p>
                <p>{{ event.category }}</p>
              </div>
              <div>
                <p>{{ event.startDate.toLocaleString() }}</p>
                <p>{{ event.location }}</p>
              </div>
            </div>
            <div>
              <p>{{event.description}}</p>
            </div>
            <div class="d-flex justify-content-between">
              <div> 
                <p>{{ eventRemainingTickets }} tickets left</p>
              </div>
              <div>
                <button v-if="!event.isCanceled && eventRemainingTickets > 0" @click="buyTicket()" class="btn btn-success mb-2">Grab A Ticket</button>
                <p v-else-if="event.isCanceled" class="fs-3">This Event Has Been Cancelled</p>
                <p v-else>There are no more tickets available for this event</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section v-else class="row">
      <p>Loading...</p>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { computed, onMounted } from "vue";
import { ticketsService } from "../services/TicketsService.js"

export default {
  setup(){
    const route = useRoute();

    onMounted(() => {
      getEventById();
    })

  
    async function getEventById() {
      try {
        let eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

  return {
    event: computed(() => AppState.activeEvent),
    eventRemainingTickets: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount ),
    account: computed(() => AppState.account),
    haveTicket: computed(() => AppState.tickets.find(
      (ticket) => ticket.accountId == AppState.account.id
    )),

    async buyTicket() {
      try {
        let eventId = route.params.eventId
        await ticketsService.buyTicket(eventId)
      } catch (error) {
        Pop.error(error)
      }

    }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>