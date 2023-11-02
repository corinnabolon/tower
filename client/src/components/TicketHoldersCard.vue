<template>
    <img :src="ticketHoldersProp.picture" alt="Ticket Holder Image" class="rounded-circle">
</template>


<script>
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
import { TicketHolder } from "../models/TicketHolder.js";

export default {
  props:  { ticketHoldersProp: { type: TicketHolder, required: true } },
  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

img {
  height: 10vh;
  width: auto;
  margin: 5px;
  object-fit: contain;
}

</style>