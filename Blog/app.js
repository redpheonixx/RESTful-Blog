var bodyParser   = require("body-parser"),
methodOverride   = require("method-override"),
mongoose         = require("mongoose"),
express          = require("express"),
expressSanitizer = require("express-sanitizer"),
app              = express() ;

var port=3000;

var uri="*****************************************************" // enter mlab uri

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

var blogSchema=new mongoose.Schema({
	title: String, 
	image: String, 
	body: String,
	created: {type:Date, default: Date.now}
});

var Blog= mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title:"Test Blog", 
// 	image:"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=360&q=80", 
// 	body:"Hello This is a blog post!",
// });

app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index", {blogs:blogs});
		}
	});
});

app.get("/blogs/new", function(req, res){
	res.render("new");
});

app.post("/blogs", function(req, res){
	req.body.blog.body= req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			console.log(err);
		}else{
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog: foundBlog});
		}
	})
});

app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
})

app.put("/blogs/:id", function(req, res){
	req.body.blog.body= req.sanitize(req.body.blog.body); 
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});


app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	})
});

app.listen(port, function(){
	console.log("Server started on port "+ port);
});

 
