import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { eventsService } from "./EventsService.js"


class TicketsService {

  async buyTicket(eventId) {
    const res = await api.post("api/tickets", {eventId})
    logger.log(res.data)
    AppState.tickets.push(new Ticket(res.data))
    eventsService.getEventById(eventId)
  }

}

export const ticketsService = new TicketsService()