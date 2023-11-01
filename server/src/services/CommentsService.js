import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"

class CommentsService {

  async createComment(commentData) {
    let towerEvent = await towerEventsService.getEventById(commentData.eventId)
    if (towerEvent.isCanceled) {
      throw new Forbidden("This event has been canceled; you can'd leave any new comments on it.")
    }
    let comment = await dbContext.Comments.create(commentData)
    await comment.populate("creator", "name picture")
    return comment
  }

  async getCommentsByEventId(eventId) {
    let comments = await dbContext.Comments.find({ eventId: eventId }).populate("creator", "name picture")
    return comments
  }

  async deleteComment(commentId, userId) {
    let comment = await dbContext.Comments.findById(commentId)

    if (!comment) {
      throw new BadRequest(`${commentId} is not a valid comment ID.`)
    }

    if (comment.creatorId.toString() != userId) {
      throw new Forbidden(`This is not your comment to delete.`)
    }

    await comment.delete()
    return "Comment deleted."
  }


}

export const commentsService = new CommentsService()