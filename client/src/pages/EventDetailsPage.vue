<template>
  <div class="container-fluid">
    <section v-if="event" class="row justify-content-center">
      <!-- ////SECTION top box which shows all the event info -->
      <div class="col-10 theme-pink-bg mt-4 rounded position-relative">
        <section class="row">
          <div class="col-12 col-md-4">
            <img :src="event.coverImg" alt="Event Image" class="container-fluid my-3">
          </div>
          <div class="col-12 col-md-8">
            <div class="d-md-flex justify-content-between">
              <div>
                <p class="fs-1 mb-0">{{ event.name }}</p>
                <p>Category: {{ event.type }}</p>
              </div>
              <div class="m-2 p-1 border rounded d-flex flex-column justify-content-center">
                <p class="m-0">{{ event.startDate.toLocaleString() }}</p>
                <p class="m-0">{{ event.location }}</p>
              </div>
            </div>
            <div>
              <p class="p-2">{{ event.description }}</p>
            </div>
            <div class="d-flex justify-content-evenly">
              <div>
                <p class="border p-1 rounded text-center m-2" v-if="!event.isCanceled">{{ eventRemainingTickets }}
                  tickets left</p>
              </div>
              <div v-if="haveTicket">
                <p class="m-2" v-if="calcOfTickets == 1">You have bought {{ calcOfTickets }} ticket to this event!</p>
                <p class="m-2" v-else>You have bought {{ calcOfTickets }} tickets to this event!</p>
              </div>
              <div>
                <button v-if="!event.isCanceled && eventRemainingTickets > 0 && account.id" @click="buyTicket()"
                  class="btn btn-success mb-2">Grab A Ticket</button>
                <p v-else-if="event.isCanceled" class="fs-3 m-1">This Event Has Been Cancelled</p>
                <p class="mb-2" v-else-if="eventRemainingTickets <= 0">There are no more tickets available for this event
                </p>
                <p class="mb-2" v-else>Log in to buy a ticket!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="event.isCanceled" class="position-absolute">
        <div>
          <div class="canceled position-relative">
          </div>
        </div>
      </div>
      <div v-else-if="(event.capacity - event.ticketCount) <= 0" class="position-absolute">
        <div>
          <div class="sold-out position-relative">
          </div>
        </div>
      </div>
      <div v-if="event.isCanceled" class="canceled-words position-absolute">
        <p>Cancelled!</p>
      </div>
      <div v-else-if="(event.capacity - event.ticketCount) <= 0" class="sold-out-words position-absolute">
        <p>Sold Out!</p>
      </div>
    </section>
    <section v-else class="row">
      <p>Loading...</p>
    </section>
    <section v-if="event" class="row justify-content-center">
      <div v-if="event.creatorId == account.id && !event.isCanceled" class="col-10 d-flex justify-content-center">
        <button @click="cancelEvent(event)" class="btn btn-theme-yellow mt-5">Cancel Event</button>
      </div>
    </section>
    <section v-else>
      Loading...
    </section>
    <section class="row justify-content-center">
      <div class="col-10">
        <p v-if="!ticketHolders.length" class="fs-4 mt-5">There are no ticketholders yet.</p>
        <p v-else class=" fs-4 mt-5">See who is attending:</p>
      </div>
      <div class="col-10 d-flex flex-wrap theme-lightgray-bg rounded">
        <div v-for="ticketHolder in ticketHolders" :key="ticketHolder.id">
          <TicketHoldersCard :ticketHoldersProp="ticketHolder" />
        </div>
      </div>
    </section>
    <section class="row justify-content-center mt-5">
      <div class="col-12 col-md-7">
        <div>
          <p class="fs-4">What people are saying:</p>
        </div>
        <div class="theme-lightgray-bg rounded mb-3">
          <div v-if="account.id">
            <button class="btn btn-success m-4" data-bs-toggle="modal" data-bs-target="#commentModal">
              Post Comment
            </button>
          </div>
          <div v-else>
            <p class="fs-5 text-center mt-4 pt-4">Log in to post a comment!</p>
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

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      getEventById();
      getTicketHoldersByEventId();
      getCommentsOfEvent();
    })



    async function getEventById() {
      try {
        let eventId = route.params.eventId
        await eventsService.getEventById(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getTicketHoldersByEventId() {
      try {
        let eventId = route.params.eventId
        await ticketsService.getTicketHoldersByEventId(eventId)
      } catch (error) {
        Pop.error(error)
      }
    }

    async function getCommentsOfEvent() {
      try {
        let eventId = route.params.eventId;
        await commentsService.getCommentsOfEvent(eventId);
      } catch (error) {
        Pop.error(error)
      }
    }


    return {
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
      eventRemainingTickets: computed(() => AppState.activeEvent.capacity - AppState.activeEvent.ticketCount),
      ticketHolders: computed(() => AppState.ticketHolders),
      comments: computed(() => AppState.comments),
      haveTicket: computed(() => AppState.tickets.find(
        (ticket) => ticket.accountId == AppState.account.id
      )),
      calcOfTickets: computed(() => {
        let count = 0
        AppState.myTickets.forEach((ticket) => {
          if (route.params.eventId == ticket.eventId) {
            count++
          }
        }
        )
        return count
      }),

      async buyTicket() {
        try {
          let eventId = route.params.eventId
          await ticketsService.buyTicket(eventId)
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
img {
  max-height: 80vh;
  object-fit: cover;
  object-position: center;
}

.canceled {
  height: 20vh;
  width: 50vw;
  background-color: red;
  transform: rotate(170deg);
  margin-top: 6%;
  margin-left: 25%;
}

.canceled-words {
  color: white;
  font-size: 36pt;
  transform: rotate(-10deg);
  margin-left: 80%;
}

.sold-out {
  height: 20vh;
  width: 50vw;
  background-color: blue;
  transform: rotate(170deg);
  margin-top: 6%;
  margin-left: 25%;
}

.sold-out-words {
  color: white;
  font-size: 36pt;
  transform: rotate(-10deg);
  // margin-bottom: 30%;
  margin-left: 80%;
}

@media (max-width: 768px) {

  .canceled {
    height: 20vh;
    width: 80vw;
    background-color: red;
    transform: rotate(170deg);
    margin-top: 90%;
    margin-left: 5%;
  }

  .canceled-words {
    color: white;
    font-size: 36pt;
    transform: rotate(-10deg);
    margin-left: 20%;
    margin-top: 90%;
  }

  .sold-out {
    height: 20vh;
    width: 80vw;
    background-color: blue;
    transform: rotate(170deg);
    margin-top: 90%;
    margin-left: 5%;
  }

  .sold-out-words {
    color: white;
    font-size: 36pt;
    transform: rotate(-10deg);
    margin-left: 20%;
    margin-top: 90%;
  }

}
</style>