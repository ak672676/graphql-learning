const Post = require("../../models/Post");
const chechAuth = require("../../util/check-auth");
const { AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = chechAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = chechAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username !== post.username) {
          throw new AuthenticationError("You are not allowed to delete this post");
        } else {
          await post.delete();
          return "Post deleted";
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
