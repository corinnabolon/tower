<template>
  <div>
    <img :src="commentProp.creator.picture" alt="Commenter's picture" class="rounded-circle mb-4">
  </div>
  <div class="theme-pink-bg rounded mx-3 mb-4 box">
    <div class="row">
      <div class="col-12 d-flex justify-content-between">
        <p class="fs-5 fw-bold mx-2 mb-1">{{ commentProp.creator.name }}</p>
        <p v-if="commentProp.isAttending" class="me-2">bought a ticket!</p>
        <!-- //TODO: make this work--but first, test it--does buying a ticket change isAttending?  Also, put margin at the bottom -->
      </div>
      <div class="col-9">
        <p class="m-2">{{ commentProp.body }}</p>
      </div>
      <div v-if="account" class="col-1">
        <div v-if="account.id == commentProp.creatorId">
          <p @click="deleteComment(`${commentProp.id}`)" class="btn btn-danger" title="Delete your comment"><i
              class="mdi mdi-delete"></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Comment } from "../models/Comment.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";
import { logger } from "../utils/Logger.js";

export default {
  props: { commentProp: { type: Comment, required: true } },

  setup() {
    return {
      account: computed(() => AppState.account),

      async deleteComment(commentId) {
        try {
          logger.log(commentId)
          let wantsToDelete = await Pop.confirm("Are you sure you want to delete your comment?")
          if (!wantsToDelete) {
            return
          }
          await commentsService.deleteComment(commentId)
          Pop.success("Comment deleted.")
        } catch (error) {
          Pop.error(error)
        }

      }
    }
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