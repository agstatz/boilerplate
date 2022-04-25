const { mongoose } = require(".")

const CommentReportSchema = mongoose.Schema({
  commentID: {
    type: String,
    required: true,
    unique : true,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }, 
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  writtenAt: {
    type: Date,
  },
  author: {
    type: String,
    required: true,
  }
  
})
const commentReport = mongoose.model("comment_reports", CommentReportSchema);

module.exports = commentReport;
