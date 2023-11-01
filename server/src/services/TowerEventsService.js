import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {

  async createEvent(eventData) {
    const towerEvent = await dbContext.TowerEvents.create(eventData)
    await towerEvent.populate("creator", "name picture")
    //TODO: add a populate for ticketCount virtual
    return towerEvent
  }

  async getAllEvents() {
    const towerEvents = await dbContext.TowerEvents.find()
    //TODO: add a populate for ticketCount
    return towerEvents
  }

  async getEventById(eventId) {
    const towerEvent = await dbContext.TowerEvents.findById(eventId)
    //TODO: add a populate for ticketCount
    if (!towerEvent) {
      throw new BadRequest(`${eventId} is not a valid Event ID`)
    }
    return towerEvent
  }


  async editEventById(eventData, eventId, userId) {
    let towerEventToEdit = await this.getEventById(eventId)
    if (towerEventToEdit.creatorId.toString() != userId) {
      throw new Forbidden("Not your event to edit")
    }

    towerEventToEdit.name = eventData.name || towerEventToEdit.name
    towerEventToEdit.description = eventData.description || towerEventToEdit.description
    towerEventToEdit.coverImg = eventData.coverImg || towerEventToEdit.coverImg
    towerEventToEdit.location = eventData.location || towerEventToEdit.location

    towerEventToEdit.capacity = towerEventToEdit.capacity != undefined ? towerEventToEdit.capacity : eventData.capacity
    towerEventToEdit.startDate = towerEventToEdit.startDate != undefined ? towerEventToEdit.startDate : eventData.startDate
    towerEventToEdit.type = eventData.type || towerEventToEdit.type

    await towerEventToEdit.save()
    return towerEventToEdit
  }

  async cancelEvent(eventId, userId) {
    let towerEventToCancel = await this.getEventById(eventId)
    if (towerEventToCancel.creatorId.toString() != userId) {
      throw new Forbidden("Not your event to cancel")
    }
    towerEventToCancel.isCanceled = !towerEventToCancel.isCanceled
    await towerEventToCancel.save()
    return towerEventToCancel
  }


}

export const towerEventsService = new TowerEventsService()