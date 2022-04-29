import axios from "axios";
import { store } from "../../store/store";

export const getComments = async (diningCourtName) => {
  const url = "http://localhost:3001/api/comments/" + diningCourtName;
  console.log(url);
  const res = await axios.get(url);
  return res.data;
};

export const createComment = async (text, parentID = null, diningCourtName) => {
  const comment = {
    username: store.getState().app.username,
    parentID: parentID,
    diningCourtName: diningCourtName,
    body: text,
  };
  const url = "http://localhost:3001/api/comments/" + diningCourtName;
  const res = await axios.post(url, comment);
  console.log(res.data);
  return res.data;
};

export const updateComment = async (id, text = null, likes = null) => {
  const comment = {};
  if (text !== null) comment.body = text;
  if (likes !== null) comment.likes = likes;
  const url = `http://localhost:3001/api/comments/${id}`;
  const res = await axios.put(url, comment);
  return res.data;
};

export const deleteComment = async (id) => {
  const url = `http://localhost:3001/api/comments/${id}`;
  const res = await axios.delete(url);
  return res.data;
};

const storedComments = [
  {
    id: "um1jv6s",
    parentID: null,
    body: "This lunch menu is stacked",
    username: "John Test",
    userID: "1",
    createdAt: "2022-04-01T15:57:57.384Z",
  },
  {
    id: "o4zkhsg",
    parentID: null,
    body: "Guys they ran out of thin cut fries",
    username: "Disappointed Boilermaker",
    userID: "2",
    createdAt: "2022-04-01T15:56:57.354Z",
  },
  {
    id: "8efwwrl",
    parentID: "o4zkhsg",
    body: "Why even go to Ford?",
    username: "Equally Frustrated Boilermaker",
    userID: "3",
    createdAt: "2022-04-01T15:58:08.266Z",
  },
  {
    id: "v161lon",
    parentID: "um1jv6s",
    body: "I've been waiting for garlic cheese pizza for so long.",
    username: "Pizza Enjoyer",
    userID: "4",
    createdAt: "2022-04-01T15:58:19.479Z",
  },
];
