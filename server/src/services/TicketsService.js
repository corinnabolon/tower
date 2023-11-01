import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
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

  async deleteTicket(ticketId, userId) {

    let ticket = await dbContext.Tickets.findById(ticketId)

    if (!ticket) {
      throw new BadRequest(`${ticketId} is not a valid ticket ID.`)
    }

    if (ticket.accountId.toString() != userId) {
      throw new Forbidden(`This is not your ticket to delete.`)
    }

    await ticket.delete()

    return "Ticket Deleted"
  }

}

export const ticketsService = new TicketsService()