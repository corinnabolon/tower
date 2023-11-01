import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {

  constructor() {
    super("api/events")
    this.router
      .get("", this.getAllEvents)
      .get("/:eventId", this.getEventById)
      .get("/:eventId/tickets", this.getTicketsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createEvent)
      .put("/:eventId", this.editEventById)
      .delete("/:eventId", this.cancelEvent)
  }

  async createEvent(req, res, next) {
    try {
      const eventData = req.body
      const userId = req.userInfo.id
      eventData.creatorId = userId
      const event = await towerEventsService.createEvent(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)

    }
  }

  async getEventById(req, res, next) {
    try {
      let eventId = req.params.eventId
      const event = await towerEventsService.getEventById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async editEventById(req, res, next) {
    try {
      let eventData = req.body
      let eventId = req.params.eventId
      let userId = req.userInfo.id
      let editedEvent = await towerEventsService.editEventById(eventData, eventId, userId)
      return res.send(editedEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      let eventId = req.params.eventId
      let userId = req.userInfo.id
      let eventToCancel = await towerEventsService.cancelEvent(eventId, userId)
      return res.send(eventToCancel)
    } catch (error) {
      next(error)
    }
  }


  async getTicketsByEventId(req, res, next) {
    try {
      let eventId = req.params.eventId
      let tickets = await ticketsService.getTicketsByEventId(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }





}