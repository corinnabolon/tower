import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {

  async getEvents() {
    const res = await api.get("api/events")
    AppState.events = res.data.map((eventPOJO) => new TowerEvent(eventPOJO))
  }

  async getEventById(eventId) {
    AppState.activeEvent = null;
    const res = await api.get(`api/events/${eventId}`);
    AppState.activeEvent = new TowerEvent(res.data)
    logger.log(AppState.activeEvent)
    //Ticket count is how many have been sold?
  }

}

export const eventsService = new EventsService()