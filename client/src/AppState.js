import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvent.js').Event[]} */
  events: [],
  /** @type {import('./models/TowerEvent.js').Event | null} */
  activeEvent: null,
  /** @type {import('./models/Ticket.js').Ticket[]} */
  tickets: [],
  /** @type {import('./models/TicketHolder.js').TicketHolder[]} */
  ticketHolders: [],
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: []
})
