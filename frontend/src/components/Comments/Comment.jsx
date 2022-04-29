import axios from "axios";
import React from "react";
import { store } from "../../store/store";

import CommentForm from "./CommentForm";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const Comment = (props) => {
  const {
    comment,
    replies,
    addComment,
    updateComment,
    deleteComment,
    activeComment = null,
    setActiveComment,
    parentID,
    diningCourt,
  } = props;

  const currentUserID = store.getState().app.username;
  console.log("Current user: " + currentUserID);

  // Flags
  const canReply = Boolean(currentUserID); // A user can reply if they are logged in.
  const canModify = currentUserID === comment.username; // A user can edit or delete their comment if they own it.
  const canReport = currentUserID !== comment.username; // A user cannot report their own comment.

  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment._id === comment._id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment._id === comment._id;

  const replyID = parentID ? parentID : comment._id;

  const reportComment = (commentID) => {
    console.log("reporting comment", commentID);

    axios.post("http://localhost:3001/api/reportComment", {
      data: {
        commentID: comment._id,
        text: comment.body,
        reportedBy: currentUserID,
        writtenAt: comment.createdAt,
        author: comment.username,
      },
    });
  };

  return (
    <div className="comment">
      <NotificationContainer />

      <div className="comment-image-container">
        <img src="/boilerplate_icon_small.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{comment.createdAt}</div>
        </div>

        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(comment._id, text, null)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ _id: comment._id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canModify && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ _id: comment._id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canModify && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment._id)}
            >
              Delete
            </div>
          )}
          {canReport && (
            <div
              className="comment-action"
              onClick={() => {
                // console.log(comment.id, userID)
                reportComment(comment._id, currentUserID);
                NotificationManager.success(
                  "Comment reported!",
                  "Success",
                  3000
                );
              }}
            >
              Report
            </div>
          )}
        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleSubmit={(text) => addComment(text, replyID, diningCourt)}
            handleCancel={() => setActiveComment(null)}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => {
              return (
                <Comment
                  key={reply._id}
                  comment={reply}
                  replies={[]}
                  addComment={addComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  parentID={comment._id}
                  diningCourt={diningCourt}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
