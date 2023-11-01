import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketsService } from "../services/TicketsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get("/tickets", this.getMyTowerEventTickets)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }


  async getMyTowerEventTickets(req, res, next) {
    try {
      let userId = req.userInfo.id
      let tickets = await ticketsService.getMyTowerEventTickets(userId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}
