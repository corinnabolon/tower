import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class TicketsService {

  async createTicket(ticketData) {

    const towerEvent = await towerEventsService.getEventById(ticketData.eventId)
    if (towerEvent.isCanceled) {
      throw new Forbidden("This event has been canceled, so you cannot buy a ticket.")
    }

    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate("profile", "name picture")
    await ticket.populate("event")
    return ticket
  }

  async getMyTowerEventTickets(userId) {
    let tickets = dbContext.Tickets.find({ accountId: userId })
      .populate({
        path: "event",
        populate: {
          path: "ticketCount"
        }
      })
    return tickets
  }

  async getTicketsByEventId(eventId) {
    let tickets = await dbContext.Tickets.find({ eventId: eventId })
      .populate("profile", "name picture")
    return tickets
  }

}

export const ticketsService = new TicketsService()