export class TowerEvent {

  constructor(data) {
    this.id = data._id || data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate) || data.startDate
    // this.startTime = new Date(data.startTime) || data.startTime
    this.isCanceled = data.isCanceled || false
    this.type = data.type
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt) || data.createdAt
    this.updatedAt = new Date(data.updatedAt) || data.updatedAt
    this.ticketCount = data.ticketCount
  }

}


const eventData = `{
  "type": "concert",
  "_id": "65418b53db11a890108187a3",
  "name": "Canadian Hand Ball",
  "description": "Will never, ever, be the same, again! Welcome to Raw Is Jericho! Beat me if you can, survive if I let you. That’s the bottom line because Stone Cold said so! Whatcha gonna do when Hulkamania runs wild on you! I am the ayatollah of rock n rolla! I am the best in the world. I am the best there is, the best there was, and the best there ever will be.",
  "coverImg": "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=80",
  "location": "At The Social Expo Center",
  "capacity": 175,
  "startDate": "2023-11-02T06:00:00.000Z",
  "isCanceled": false,
  "category": "concert",
  "creatorId": "652ef11083c134acc79f1229",
  "createdAt": "2023-10-31T23:18:43.044Z",
  "updatedAt": "2023-10-31T23:18:43.044Z",
  "__v": 0,
  "ticketCount": 0,
  "id": "65418b53db11a890108187a3"
}`