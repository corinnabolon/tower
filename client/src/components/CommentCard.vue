<template>
  <div>
    <img :src="commentProp.creator.picture" alt="Commenter's picture" class="rounded-circle mb-4">
  </div>
  <div class="theme-pink-bg rounded mx-3 mb-4 box">
    <div class="d-flex justify-content-between">
      <p class="fs-5 fw-bold mx-2 mb-1">{{ commentProp.creator.name }}</p>
      <p v-if="commentProp.isAttending">bought a ticket!</p>
      <!-- //TODO: make this work--but first, test it--does buying a ticket change isAttending?  Also, put margin at the bottom -->
    </div>
    <p class="m-2">{{ commentProp.body }}</p>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from "../models/Comment.js";

export default {
  props: { commentProp: { type: Comment, required: true } },

  setup(){
  return {  }
  }
};
</script>


<style lang="scss" scoped>

img {
  height: 15vh;
  width: auto;
}

.box {
  width: 100%;
}

</style>