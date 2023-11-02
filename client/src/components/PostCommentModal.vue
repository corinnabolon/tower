<template>
<div class="modal fade" id="commentModal" tabindex="-1" aria-labelledby="commentModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content theme-purple-bg">
      <div class="d-flex justify-content-between">
        <h1 class="fs-5 m-3">Post a Comment:</h1>
        <button type="button" class="btn-close m-2" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div>
        <form @submit.prevent="postComment()">
  <div class="mb-3">
    <textarea type="text" minlength="2" maxlength="1000" v-model="editable.body" class="form-control ms-4" id="commentBody" aria-describedby="commentBody" required></textarea>
  </div>
  <div class="d-flex justify-content-end">
    <button type="submit" class="mt-1 me-5 mb-3 ms-3 btn btn-primary">Submit</button>
  </div>
</form>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService.js";
import { Modal } from "bootstrap";

export default {
  setup(){
    let editable = ref({})
    const route = useRoute()

  return { editable, 

    async postComment() {
      try {
        let commentData = editable.value
        commentData.eventId = route.params.eventId
        await commentsService.postComment(commentData)
        Pop.success("Comment posted!")
        editable.value = {}
        Modal.getOrCreateInstance("#commentModal").hide()
      } catch (error) {
        Pop.error(error)
      }
    }

   }
  }
};
</script>


<style lang="scss" scoped>

textarea {
  width: 90%;
  height: 20vh;
}

</style>