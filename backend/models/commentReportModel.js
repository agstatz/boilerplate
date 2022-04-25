const { mongoose } = require(".")

const CommentReportSchema = mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique : true,
  }
})
const commentReport = mongoose.model("comment_reports", CommentReportSchema);

module.exports = commentReport;
