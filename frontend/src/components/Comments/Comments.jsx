import React, { useState, useEffect } from "react";

// Import comment components
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import "./commentStyles.css";

// Import test "API"
import {
  getComments as apiGetComments,
  createComment as apiCreateComment,
  updateComment as apiUpdateComment,
  deleteComment as apiDeleteComment,
} from "./testAPI";

const Comments = () => {
  // Set up state
  const [comments, setComments] = useState([]);

  // PULL THIS FROM STATE LATER
  const currentUser = "1";

  // Find comments that have no parent. These are 'root' comments, not replies.
  const rootComments = comments.filter((c) => c.parentID === null);

  // Get replies of a comment and order with the most recent reply being on bottom
  const getReplies = (commentID) => {
    return comments
      .filter((c) => c.parentID === commentID)
      .sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
  };

  // Function to add a comment
  const addComment = (text, parentID) => {
    apiCreateComment(text, parentID).then((c) => {
      setComments([c, ...comments]); // Set the new comment on top
    });
  };

  // Use effect hook
  useEffect(() => {
    apiGetComments().then((data) => {
      setComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <CommentForm submitLabel="Post" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((c) => {
          return <Comment key={c.id} comment={c} replies={getReplies(c.id)} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
