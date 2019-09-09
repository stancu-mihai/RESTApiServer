# Instructions
- Install Node.js
- Install MongoDB Community (https://www.mongodb.com/download-center#community)
- Make a data directory for MongoDB (Ex: C:\mongodata)
- Install Mongod as a service or follow the following 2 steps:
- Add "C:\Program Files\MongoDB\Server\3.4\bin" to %PATH% environment variable
- Set MongoDB to use that directory (cmd: "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "c:\mongodata")
- Open terminal, do a CD to this repository's folder
- Run "npm install"
- Run "npm install -g mocha"
- Run "mocha" for automatic tests

# Manual testing:
- Run "node server.js"
- Test "http://localhost:3000/posts" (GET) in Postman
  It should return a list of all posts in the blog
- Test "http://localhost:3000/posts" (PUT) in Postman, by selecting Body and "x-www-form-urlencoded", a key ("name") and a value ("Hello World")
  It should return the newly created post
- Test "http://localhost:3000/posts/[paste_an_ID_here]" (GET) in Postman
  It should return the post with that ID
- Test "http://localhost:3000/posts/[paste_an_ID_here]" (POST) in Postman, by selecting Body and "x-www-form-urlencoded", a key ("name") and a value ("Hello World Edited")
  It should return the modified post
- Test "http://localhost:3000/posts/[paste_an_ID_here]" (DELETE) in Postman
  It should delete the post with that ID

