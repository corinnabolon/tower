<template>
  <div class="container">
    <section class="row">
      <div class="offcanvas offcanvas-top theme-lightgray-bg text-light col-12" data-bs-backdrop="static" tabindex="-1"
        id="create-event-off-canvas" aria-labelledby="create-event-off-canvas">
        <div class="offcanvas-header">
          <p class="fs-5 offcanvas-title p-0">Post a new event!</p>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <form @submit.prevent="createEvent()">
              <div class="row justify-content-evenly">
                <div class="col-10 col-md-4">
                  <div>
                    <label for="event-type" class="form-label">What category does your event fall into?</label>
                    <select v-model="editable.type" class="form-select" name="event-type" required>
                      <option :value="type" v-for="type in eventTypes" :key="type">
                        {{ type }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-2">
                    <label for="event-name" class="form-label">Event Name:</label>
                    <input v-model="editable.name" type="text" class="form-control" id="event-name" maxlength="50"
                      required>
                  </div>
                  <div class="mb-2">
                    <label for="event-location" class="form-label">Event Location:</label>
                    <input v-model="editable.location" type="text" class="form-control" id="event-location" maxlength="30"
                      required>
                  </div>
                  <div class="mb-2">
                    <label class="control-label" for="event-date">Date</label>
                    <input v-model="editable.startDate" title="date picker" class="form-control" type="date"
                      min="1995-06-16" name="date-picker" id="date-picker">
                  </div>
                  // <div class="mb-2">
                    // <label class="control-label" for="event-time">Time</label>
                    // <input v-model="editable.startTime" title="time picker" class="form-control" type="time" //
                      min="1995-06-16" name="time-picker" id="time-picker">
                    // </div>
                  <div class="mb-2">
                    <label for="event-capacity" class="form-label">Event Capacity:</label>
                    <input v-model="editable.capacity" type="number" class="form-control" id="event-capacity" max="99999"
                      required>
                  </div>
                </div>
                <div class="col-10 col-md-8">
                  <div class="mb-2">
                    <label for="img-url" class="form-label">Image URL for the Event:</label>
                    <input v-model="editable.coverImg" type="text" class="form-control" id="img-url" maxlength="300"
                      required>
                  </div>
                  <div class="mb-2">
                    <label for="event-description" class="form-label">Tell us about your event!</label>
                    <textarea v-model="editable.description" type="text" class="form-control" id="event-description"
                      maxlength="1000" minlength="5" required></textarea>
                  </div>
                  <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary mt-4">Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { Offcanvas } from "bootstrap";
import { eventsService } from "../services/EventsService.js"
import { useRouter } from "vue-router";
import { accountService } from "../services/AccountService.js";


export default {
  components: { VueDatePicker },
  setup() {
    let editable = ref({});
    let eventTypes = ['Concert', 'Convention', 'Sport', 'Digital'];
    let router = useRouter();

    return {
      eventTypes,
      editable,


      async createEvent() {
        try {
          editable.value.type = editable.value.type.toLowerCase()
          let eventData = editable.value;
          let event = await eventsService.createEvent(eventData)
          Pop.success("Event created!")
          editable.value = {};
          Offcanvas.getOrCreateInstance("#create-event-off-canvas").hide();
          router.push({ name: "Event", params: { eventId: event.id } });
        } catch (error) {
          Pop.error(error)
        }
      },

    }
  }
};
</script>


<style lang="scss" scoped>
select {
  background-color: whitesmoke;
}

input {
  background-color: whitesmoke;
}

textarea {
  height: 31vh;
  background-color: whitesmoke;
}

.offcanvas-header {
  margin: 0;
  padding-bottom: 0;
}

.offcanvas {
  height: 80vh;
}
</style>