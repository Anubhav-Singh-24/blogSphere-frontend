// API NOTIFICATION MESSAGES
export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded. Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  requestFailure: {
    title: "Error!",
    message: "An error occur while parsing request data",
  },
  responseFailure: {
    title: "Error!",
    message:
      "An error occur while fetching response from server. Please try again",
  },
  networkError: {
    title: "Error!",
    message:
      "Unable to connect to the server. Please check internet connectivity and try again.",
  },
};


export const SERVICE_URLS = {
  userLogin: { url: "/login", method: "POST" },
  userSignup: { url: "/signup", method: "POST" },
  getAllUserPosts: { url: "/posts", method: "GET",query:true},
  getAllPosts: { url: "/allposts", method: "GET"},
  uploadFile: { url: "file/upload", method: "POST" },
  deleteFile: { url: "file/delete", method: "DELETE" ,query:true},
  createPost: { url: "create", method: "POST" },
  deletePost: { url: "delete", method: "DELETE", query: true },
  getPostById: { url: "post", method: "GET", query: true },
  newComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  updateViews: {url:"post/views",method:"GET",query:true}
};
