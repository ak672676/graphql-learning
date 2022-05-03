const postsResolver = require("./posts");
const usersResolver = require("./users");
const commentsResolver = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent, args, context, info) => {
      return parent.likes.length;
    },
    commentCount: (parent, args, context, info) => {
      return parent.comments.length;
    },
  },
  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
  },
};
