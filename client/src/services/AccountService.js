import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from "../models/Ticket.js"
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }


  async getTicketsByAccountId() {
    const res = await api.get("account/tickets")
    logger.log("Got my tickets", res.data)
    AppState.myTickets = res.data.map((ticketPOJO) => new Ticket(ticketPOJO))
    logger.log(AppState.myTickets)
}


}

export const accountService = new AccountService()
