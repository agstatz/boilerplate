import axios from "axios";
import React from "react";
import { store } from "../../store/store";

import CommentForm from "./CommentForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';


const Comment = (props) => {
  const {
    userID,
    comment,
    replies,
    addComment,
    updateComment,
    deleteComment,
    activeComment = null,
    setActiveComment,
    parentID,
  } = props;

  // Flags
  const canReply = Boolean(userID); // A user can reply if they are logged in.
  const canModify = userID === comment.userID; // A user can edit or delete their comment if they own it.

  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;

  const replyID = parentID ? parentID : comment.id;

  const reportComment = (commentID) => {
    console.log('reporting comment', commentID);

    axios.post('http://localhost:3001/api/reportComment', { data: {
      commentID: comment.id,
      text: comment.body,
      reportedBy: store.getState().app.username,
      writtenAt: comment.createdAt,
      author: comment.username
    } });
  }

  return (
    <div className="comment">
      <NotificationContainer/>

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
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canModify && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canModify && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
          {(
            <div
              className="comment-action"
              onClick={() =>{
                // console.log(comment.id, userID)
                reportComment(comment.id, userID);
                NotificationManager.success('Comment reported!', 'Success', 3000);
                
              }
                
              }
            >
              Report
            </div>
          )}
        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleSubmit={(text) => addComment(text, replyID)}
            handleCancel={() => setActiveComment(null)}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => {
              return (
                <Comment
                  key={reply.id}
                  userID={userID}
                  comment={reply}
                  replies={[]}
                  addComment={addComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  parentID={comment.id}
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
