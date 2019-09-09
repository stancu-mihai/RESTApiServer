'use strict';
module.exports = function(app) {
  var blog = require('../controllers/Controller');

  app.route('/posts')
    .get(blog.list_all_posts)
    .put(blog.create_a_post)

  app.route('/posts/:postId')
    .get(blog.read_a_post)
    .post(blog.update_a_post)
    .delete(blog.delete_a_post);
};
