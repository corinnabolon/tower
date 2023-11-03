import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {

  async getCommentsOfEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    AppState.comments = res.data.map((commentPOJO) => new Comment(commentPOJO))
    AppState.ticketHolders.forEach((ticketHolder) => {
      for (let i = 0; i < AppState.comments.length; i++) {
        if (ticketHolder.id == AppState.comments[i].creatorId) {
          AppState.comments[i].isAttending = true
        }
      }
    })
  }

  async postComment(commentData) {
    const res = await api.post("api/comments", commentData)
    let newComment = new Comment(res.data)
    AppState.ticketHolders.forEach((ticketHolder) => {
      if(ticketHolder.id == newComment.creatorId) {
        newComment.isAttending = true
      }
    })
    AppState.comments.push(newComment)
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    let commentIndex = AppState.comments.findIndex(comment => commentId == comment.id)
    AppState.comments.splice(commentIndex, 1)
  }



}

export const commentsService = new CommentsService()