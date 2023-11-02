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
    AppState.tickets.forEach((ticket) => {
      AppState.ticketHolders.push(new TicketHolder(ticket.profile))
    })
  }

  // checkTickets(eventId) {
  //   AppState.activeEvent.
  // }

  // calcMyTickets() {
  //   if (AppState.account && AppState.tickets.length > 0) {
  //     logger.log("Comparing in calcMyTickets, ticket[0].accountId", AppState.tickets[0].accountId, "AppState.account.id", AppState.account.id)
  //     AppState.tickets.forEach((ticket) => {
  //       if (ticket.accountId == AppState.account.id) {
  //         AppState.numberOfMyTickets ++
  //       }
  //     })
  //   }
  // }

  clearTicketData() {
    AppState.tickets = []
    AppState.ticketHolders = []
  }

}

export const ticketsService = new TicketsService()