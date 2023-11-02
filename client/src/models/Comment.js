export class Comment {
  constructor(data) {
    this.body = data.body
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.isAttending = data.isAttending
    this.creator = data.creator
  }
}