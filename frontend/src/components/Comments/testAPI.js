export const getComments = async () => {
  return storedComments;
};

export const createComment = async (text, parentID = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    parentID: parentID,
    body: text,
    userID: "1",
    username: "John Test",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
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
