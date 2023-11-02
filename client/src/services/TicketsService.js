import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { TicketHolder } from "../models/TicketHolder.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { eventsService } from "./EventsService.js"


class TicketsService {

  async buyTicket(eventId) {
    const res = await api.post("api/tickets", {eventId})
    let ticket = res.data
    AppState.tickets.push(new Ticket(ticket))
    AppState.ticketHolders.push(new TicketHolder(ticket.profile))
    eventsService.getEventById(eventId)
  }

  async getTicketHoldersByEventId(eventId) {
    this.clearTicketData()
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data.map((ticketPOJO) => new Ticket(ticketPOJO))
    logger.log("AppState.tickets", AppState.tickets)
    AppState.tickets.forEach((ticket) => {
      AppState.ticketHolders.push(new TicketHolder(ticket.profile))
    })
    logger.log("AppStte.ticketHolders", AppState.ticketHolders)
  }

  clearTicketData() {
    AppState.tickets = []
    AppState.ticketHolders = []
  }

}

export const ticketsService = new TicketsService()