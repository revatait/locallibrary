
how to start this app (run all as admin)
1. command prompt: D: then cd mongodb/bin then mongod
2. command prmopt: D: then cd mongodb/bin then mongo
3. node.js cl: D: then cd dev/express-moz/locallibrary then SET DEBUG=locallibrary* & npm run devstart





https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

-- finish all the delete gets/posts (for book, bookInstance, and genre)
---- I finished the genre, book, and author deletes.
---- I wrote code for book instance deletes, but didn't work through errors.
-- also finish all the update gets/posts (for bookInstance, author, and genre)
-- Genre isn't escaped at bookController.js line 214
-- take out comma at end of genre list?

















The web server must answer every HTTP request, at least with an error message.
Whenever a browser needs a file hosted on a web server, the browser requests the file via HTTP. When the request reaches the correct web server (hardware), the HTTP server (software) sends the requested document back, also through HTTP.
Client-side frameworks are often used to help speed up development of client-side code, but you can also choose to write all the code by hand; in fact, writing your code by hand can be quicker and more efficient if you only need a small, simple web site UI. In contrast, you would almost never consider writing the server-side component of a web app without a framework — implementing a vital feature like an HTTP server is really hard to do from scratch in say Python, but Python web frameworks like Django provide one out of the box, along with other very useful tools.
Creation of records (along with updates, deletes, and queries) are asynchronous operations - you supply a callback that is called when the operation completes.