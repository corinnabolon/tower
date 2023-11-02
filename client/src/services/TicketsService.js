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
    AppState.myTickets.push(new Ticket(ticket))
    AppState.ticketHolders.push(new TicketHolder(ticket.profile))
    eventsService.getEventById(eventId)
  }

  async getTicketHoldersByEventId(eventId) {
    this.clearTicketData()
    const res = await api.get(`api/events/${eventId}/tickets`)
    AppState.tickets = res.data.map((ticketPOJO) => new Ticket(ticketPOJO))
    AppState.tickets.forEach((ticket) => {
      AppState.ticketHolders.push(new TicketHolder(ticket.profile))
    })
  }

  async deleteTicket(ticketId) {
    logger.log("ticket ID", ticketId)
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log("res.data", res.data)
    logger.log(AppState.myTickets)
    let ticketIndex = AppState.myTickets.findIndex(ticket => ticket.id == ticketId)
    logger.log("Ticket index", ticketIndex)
    AppState.myTickets.splice(ticketIndex, 1)
  }

  clearTicketData() {
    AppState.tickets = []
    AppState.ticketHolders = []
  }

}

export const ticketsService = new TicketsService()