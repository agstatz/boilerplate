import React from "react";

const Comment = (props) => {
  const { comment, replies, userID } = props;

  // Flags
  const canReply = Boolean(userID); // A user can reply if they are logged in.
  const canModify = userID === comment.userID; // A user can edit or delete their comment if they own it.

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
        <div className="comment-text">{comment.body}</div>

        <div className="comment-actions">
          {canReply && <div className="comment-action">Reply</div>}
          {canModify && <div className="comment-action">Edit</div>}
          {canModify && <div className="comment-action">Delete</div>}
        </div>

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => {
              return (
                <Comment
                  key={reply.id}
                  userID={userID}
                  comment={reply}
                  replies={[]}
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
