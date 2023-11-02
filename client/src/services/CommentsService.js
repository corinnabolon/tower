import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async getCommentsOfEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log("res.data from the comments service", res.data)
    AppState.comments = res.data.map((commentPOJO) => new Comment(commentPOJO))
    logger.log("AppState.comments from the comments service", AppState.comments)
  }

  async postComment(commentData) {
    const res = await api.post("api/comments", commentData)
    logger.log("Comments service, posting comment, res.data", res.data)
    AppState.comments.push(new Comment(res.data))
    logger.log("Comments in the AppState", AppState.comments)
  }
}

export const commentsService = new CommentsService()