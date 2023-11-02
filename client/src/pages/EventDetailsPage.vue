<template>
  <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
      <!-- ////SECTION top box which shows all the event info -->
      <div class="col-10 theme-pink-bg mt-3 rounded">
        <section class="row">
          <div class="col-4">
            <img :src="event.coverImg" alt="Event Image" class="container-fluid my-3">
          </div>
          <div class="col-8">
            <div class="d-flex justify-content-between">
              <div>
                <p class="fs-1 mb-0">{{ event.name }}</p>
                <p>{{ event.type }}</p>
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
              <div v-if="haveTicket">
                <p>You have bought a ticket to this event! Need more?</p>
              </div>
              <div>
                <button v-if="!event.isCanceled && eventRemainingTickets > 0 && account.id" @click="buyTicket()" class="btn btn-success mb-2">Grab A Ticket</button>
                <p v-else-if="event.isCanceled" class="fs-3">This Event Has Been Cancelled</p>
                <p v-else-if="eventRemainingTickets <= 0">There are no more tickets available for this event</p>
                <p v-else>Log in to buy a ticket!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section v-else class="row">
      <p>Loading...</p>
    </section>
    <!-- <div>
      Number of tickets {{ numberOfTickets }}
    </div> -->
    <section v-if="event" class="row justify-content-center">
        <div v-if="event.creatorId == account.id && !event.isCanceled" class="col-10 d-flex justify-content-center">
          <button @click="cancelEvent(event)" class="btn btn-danger mt-5">Cancel Event</button>
        </div>
    </section>
    <section v-else>
      Loading...
    </section>
      <section class="row justify-content-center">
      <div class="col-10">
        <p class="fs-4 mt-5">See who is attending:</p>
      </div>
      <div class="col-10 d-flex flex-wrap theme-lightgray-bg rounded">
        <div v-for="ticketHolder in ticketHolders" :key="ticketHolder.id">
          <TicketHoldersCard :ticketHoldersProp="ticketHolder"/>
        </div>
      </div>
    </section>
    <section class="row justify-content-center mt-5">
      <div class="col-7">
        <div>
          <p class="fs-5">What people are saying:</p>
        </div>
        <div class="theme-lightgray-bg rounded">
          <div v-if="account">
            <button
                    class="btn btn-success m-4"
                    data-bs-toggle="modal"
                    data-bs-target="#commentModal"
                  >
                    Post Comment
                  </button>
          </div>
          <div v-for="comment in comments" :key="comment.id" class="d-flex my-5 mx-2">
            <CommentCard :commentProp="comment" />
          </div>
        </div>
      </div>

    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { computed, onMounted, onUpdated } from "vue";
import { ticketsService } from "../services/TicketsService.js"
import { commentsService } from "../services/CommentsService.js"
import { logger } from "../utils/Logger.js";

export default {
  setup(){
    const route = useRoute();

    onMounted(() => {
      getEventById();
      getTicketHoldersByEventId();
      getCommentsOfEvent();
      // calcMyTickets();
    })


  
    async function getEventById() {
      try {
        let eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    //getTicketHolders is like getCollaboratorsOnAlbum
    async function getTicketHoldersByEventId() {
      try {
        let eventId = route.params.eventId
        await ticketsService.getTicketHoldersByEventId(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    //getCommentsOfEvent is like getPicturesByAlbumId
    async function getCommentsOfEvent() {
      try {
        let eventId = route.params.eventId;
        await commentsService.getCommentsOfEvent(eventId);
      } catch (error) {
        Pop.error(error)
      }
    }

    function checkTickets() {
      let eventId = route.params.eventId
      ticketsService.checkTickets(eventId)
    }

    // function calcMyTickets() {
    //   ticketsService.calcMyTickets()
    // }


  return {
    // numberOfMyTickets: computed(() => AppState.numberOfMyTickets),
    account: computed(() => AppState.account),
    event: computed(() => AppState.activeEvent),
    eventRemainingTickets: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount ),
    ticketHolders: computed(() => AppState.ticketHolders),
    comments: computed(() => AppState.comments),
    haveTicket: computed(() => AppState.tickets.find(
      (ticket) => ticket.accountId == AppState.account.id
    )),
    // calcOfTickets: computed(() => AppState.tickets.forEach(
    //   (ticket) => {
    //     if(ticket.accountId == AppState.account.id) {
    //       numberOfTickets ++
    //     }
    //   }
    // )),

    async buyTicket() {
      try {
        logger.log("Account before buying ticket:", AppState.account)
        let eventId = route.params.eventId
        await ticketsService.buyTicket(eventId)
        logger.log("Account after buying ticket", AppState.account)
      } catch (error) {
        Pop.error(error)
      }
    },

    async cancelEvent(event) {
      try {
        let wantsToCancel = await Pop.confirm("Are you sure you want to cancel this event?")
        if (!wantsToCancel) {
          return
        }
        let eventId = event.id
        await eventsService.cancelEvent(eventId)
        Pop.success("Your event has been cancelled.")        
      } catch (error) {
        Pop.error(error)
        }
    },


    };
  },
};
</script>


<style lang="scss" scoped>

</style>