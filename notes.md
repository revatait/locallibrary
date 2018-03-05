
how to start this app (run all as admin)
1. command prompt: D: then cd mongodb/bin then mongod
2. command prmopt: D: then cd mongodb/bin then mongo
3. node.js cl: D: then cd dev/express-moz/locallibrary then SET DEBUG=locallibrary* & npm run devstart





https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms

updated:	  book, author
needs update: bookinstance, genre


-- take out comma at end of genre list?
-- add book list to author update?
-- check on "present" as valid date
-- how to make sure that a record isn't already in the system?



1. add users
2. add read dates (multiple)
3. add eras, geos, mediums, etc
4. nest genres?
5. published date vs first published date












The web server must answer every HTTP request, at least with an error message.
Whenever a browser needs a file hosted on a web server, the browser requests the file via HTTP. When the request reaches the correct web server (hardware), the HTTP server (software) sends the requested document back, also through HTTP.
Client-side frameworks are often used to help speed up development of client-side code, but you can also choose to write all the code by hand; in fact, writing your code by hand can be quicker and more efficient if you only need a small, simple web site UI. In contrast, you would almost never consider writing the server-side component of a web app without a framework — implementing a vital feature like an HTTP server is really hard to do from scratch in say Python, but Python web frameworks like Django provide one out of the box, along with other very useful tools.
Creation of records (along with updates, deletes, and queries) are asynchronous operations - you supply a callback that is called when the operation completes.




a document is an instances of a model

1. one to few: embed addresses within Person object
2. one to many: each publisher and each book would have their own documents; refer to publisher ID in book doc
	-- this is called "application-level join"
	-- use object IDs for efficiency
	-- books can have more than one publisher, publishers obviously can have more than one book = N to N
3. one to squillions: refer to machine ID in event document

avoid embedding if you need to access an object on its own
structure your data to match the ways that your application will query and update it

tree with parent references		store references to "parent" nodes in "child" nodes
tree with child references		store references to "child" nodes in "parent" nodes
tree with array of ancestors	store references to "parent" nodes an an array that stores all ancestors
tree with materalized paths		stores full path relationship paths between documents
tree with nested sets			tree-like structure to discover subtrees

parent references
db.categories.insert( { _id: "MongoDB", parent: "Databases" } )
db.categories.insert( { _id: "dbm", parent: "Databases" } )
db.categories.insert( { _id: "Databases", parent: "Programming" } )
db.categories.insert( { _id: "Languages", parent: "Programming" } )
db.categories.insert( { _id: "Programming", parent: "Books" } )
db.categories.insert( { _id: "Books", parent: null } )
db.categories.findOne( { _id: "MongoDB" } ).parent


child references
db.categories.insert( { _id: "MongoDB", children: [] } )
db.categories.insert( { _id: "dbm", children: [] } )
db.categories.insert( { _id: "Databases", children: [ "MongoDB", "dbm" ] } )
db.categories.insert( { _id: "Languages", children: [] } )
db.categories.insert( { _id: "Programming", children: [ "Databases", "Languages" ] } )
db.categories.insert( { _id: "Books", children: [ "Programming" ] } )
db.categories.findOne( { _id: "Databases" } ).children

ancestors
db.categories.insert( { _id: "MongoDB", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "dbm", ancestors: [ "Books", "Programming", "Databases" ], parent: "Databases" } )
db.categories.insert( { _id: "Databases", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Languages", ancestors: [ "Books", "Programming" ], parent: "Programming" } )
db.categories.insert( { _id: "Programming", ancestors: [ "Books" ], parent: "Books" } )
db.categories.insert( { _id: "Books", ancestors: [ ], parent: null } )
db.cateogries.findOne( { _id: "MongoDB" } ).ancestors

materialized paths
db.categories.insert( { _id: "Books", path: null } )
db.categories.insert( { _id: "Programming", path: ",Books," } )
db.categories.insert( { _id: "Databases", path: ",Books,Programming," } )
db.categories.insert( { _id: "Languages", path: ",Books,Programming," } )
db.categories.insert( { _id: "MongoDB", path: ",Books,Programming,Databases," } )
db.categories.insert( { _id: "dbm", path: ",Books,Programming,Databases," } )
db.categories.find().sort( { path : 1 } )

nested sets
db.categories.insert( { _id: "Books", parent: 0, left: 1, right: 12 } )
db.categories.insert( { _id: "Programming", parent: "Books", left: 2, right: 11 } )
db.categories.insert( { _id: "Languages", parent: "Programming", left: 3, right: 4 } )
db.categories.insert( { _id: "Databases", parent: "Programming", left: 5, right: 10 } )
db.categories.insert( { _id: "MongoDB", parent: "Databases", left: 6, right: 7 } )
db.categories.insert( { _id: "dbm", parent: "Databases", left: 8, right: 9 } )
var databaseCategory = db.categories.findOne( { _id: "Databases" } );