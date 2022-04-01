import React, { useState } from "react";

const CommentForm = (props) => {
  // Get props
  const { submitLabel, handleSubmit, initialText = "" } = props;

  // Setup state
  const [text, setText] = useState(initialText);

  // On submit handler for the form
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button">{submitLabel}</button>
    </form>
  );
};

export default CommentForm;
