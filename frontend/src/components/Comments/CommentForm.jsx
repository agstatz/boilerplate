import React, { useState } from "react";

const CommentForm = (props) => {
  // Get props
  const {
    submitLabel,
    handleSubmit,
    hasCancelButton = false,
    initialText = "",
    handleCancel,
  } = props;

  // Setup state
  const [text, setText] = useState(initialText);

  // Check to disable button to prevent empty comments
  const textAreaDisabled = text.length === 0;

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
      <button className="comment-form-button" disabled={textAreaDisabled}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default CommentForm;
