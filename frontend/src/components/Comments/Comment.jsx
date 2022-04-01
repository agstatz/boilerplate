import React from "react";

import CommentForm from "./CommentForm";

const Comment = (props) => {
  const {
    userID,
    comment,
    replies,
    addComment,
    updateComment,
    deleteComment,
    activeComment,
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

  return (
    <div className="comment">
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
                  parentId={comment.id}
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
