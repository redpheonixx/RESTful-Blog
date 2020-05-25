## RESTful Blog
This blog is built using MEAN stack. This is one of the assignments of **The Web Developer Bootcamp** .

### RESTful Routes
##### A table of all 7 RESTful routes
|  Name | Path  | HTTP Verb  | Purpose  |  Mongoose Method|
|---|---|---|---|---|
| Index  |/blogs   | GET  |  List all blogs |Blog.find()   |
|  New |/blogs/new   |GET   | show new blog form  |  N/A |
| Create  |  /blogs|  POST | create new blog and redirect to /blogs  |  Blog.create() |
|  Show | /blogs/:id  |GET   |  show info about one specific blog | Blog.findById()  |
|  Edit |  /blogs/:id/edit | GET  | show edit form for one blog  | Blog.findById()  |
|  Update |  /blogs/:id |PUT   |  update particular blog then redirect to /blogs | Blog.findByIdAndUpdate()  |
|   Destroy| /blogs/:id  | DELETE  | delete particular blog then redirect to /blogs | Blog.findByIdAndRemove()  |
