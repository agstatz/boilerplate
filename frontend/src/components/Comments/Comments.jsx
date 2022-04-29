import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import axios from 'axios';

// Import comment components
import Comment from './Comment';
import CommentForm from './CommentForm';
import './commentStyles.css';

// Import test "API"
import {
    getComments as apiGetComments,
    createComment as apiCreateComment,
    updateComment as apiUpdateComment,
    deleteComment as apiDeleteComment,
} from './APIWrapper';

const Comments = (props) => {
    // Get dining court
    const { diningCourt } = props;
    console.log(diningCourt);

    // Get current user ID
    const currentUserID = store.getState().app.username;

    // Set up state
    const [comments, setComments] = useState([]); // Comments state
    const [activeComment, setActiveComment] = useState(null); // Active comment. Used for performing actions on a comment.

    // Find comments that have no parent. These are 'root' comments, not replies.
    const rootComments = comments.filter((c) => c.parentID === null);

    // Get replies of a comment and order with the most recent reply being on bottom
    const getReplies = (commentID) => {
        return comments
            .filter((c) => c.parentID === commentID)
            .sort((a, b) => {
                return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                );
            });
    };

    // Function to add a comment
    const addComment = (text, parentID) => {
        console.log('Adding', text, parentID);
        apiCreateComment(text, parentID, diningCourt).then((c) => {
            setComments([c, ...comments]); // Set the new comment on top
            setActiveComment(null); // Set active comment to null if this was a submit function
        });
    };

    // Function to update a comment
    const updateComment = (commentID, text, likes) => {
        apiUpdateComment(commentID, text, likes).then(() => {
            const updated = comments.map((c) => {
                if (c._id === commentID) {
                    return { ...c, body: text, likes: likes };
                }
                return c;
            });
            setComments(updated);
            setActiveComment(null);
        });
    };

    // Function to delete a comment
    const deleteComment = (commentID) => {
        if (window.confirm('Delete comment?')) {
            apiDeleteComment(commentID).then(() => {
                const updated = comments.filter((c) => c._id !== commentID);
                setComments(updated);
            });
        }
    };

    // Use effect hook
    useEffect(() => {
        apiGetComments(diningCourt).then((data) => {
            setComments(data);
        });
    }, []);

    return (
        <div className='comments p-4'>
            <h3 className='comments-title'>Comments</h3>
            <CommentForm submitLabel='Post' handleSubmit={addComment} />
            <div className='comments-container'>
                {rootComments.map((c) => {
                    return (
                        <Comment
                            key={c._id}
                            comment={c}
                            replies={getReplies(c._id)}
                            addComment={addComment}
                            updateComment={updateComment}
                            deleteComment={deleteComment}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            diningCourt={diningCourt}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Comments;
