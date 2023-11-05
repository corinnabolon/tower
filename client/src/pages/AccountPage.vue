<template>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <div class="about text-center">
          <h1>Welcome {{ account.name }}</h1>
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </div>
      <div v-if="myTickets" class="col-12 d-flex flex-column align-items-center">
        <p class="fs-1 text-center mt-5 mb-0 pb-0">Your Tickets:</p>
        <div v-if="!myTickets.length">
          <p class="fs-3 text-center">You currently have no tickets.</p>
        </div>
        <div v-else>
          <div v-for="ticket in myTickets" :key="ticket.id" class="mt-3">
            <TicketCard :ticketProp="ticket" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { accountService } from "../services/AccountService.js"

export default {
  setup() {

    onMounted(() => {
      accountService.getTicketsByAccountId();
    })


    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
