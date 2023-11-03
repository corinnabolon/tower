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
  }

  async createEvent(eventData) {
    const res = await api.post("api/events/", eventData)
    let newEvent = new TowerEvent(res.data)
    AppState.events.push(newEvent)
    return newEvent
  }

  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    AppState.activeEvent = new TowerEvent(res.data)
  }

}

export const eventsService = new EventsService()