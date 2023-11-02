<template>
  <div class="container-fluid">
    <section class="row">
      <div class="about text-center">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <!-- //TODO: render them differently if the event has been canceled -->
      <div v-if="myTickets" class="col-12 d-flex flex-column align-items-center">
        <div v-for="ticket in myTickets" :key="ticket.id" class="mt-3">
        <TicketCard :ticketProp="ticket" />
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
