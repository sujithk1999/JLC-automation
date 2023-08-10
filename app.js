const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


const headpara = "Doctors are considered the most important and responsible people in society. They are the ones who support when someone is struggling with their health. Doctors are the ones to have a profound knowledge of all kinds of diseases, their symptoms, and their treatments.";
const aboutus= "We are a one-stop solution for outpatient health care. The Family Doctor Clinics in Bangalore were born for bridging the gaps in the current healthcare ecosystem with the adoption of best practices and the latest technology. The family doctor has touched over 2 Million lives and is always looking forward to serve many more. We provide trustworthy and affordable healthcare for you and your family in your neighbourhood!";
const contactus="For further information about the hospital and booking appointment can be done by below contact details";



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("Public"));
app.set('views', './View'); 
app.set('view engine', 'ejs');


let posts = [];

app.get("/", function(req, res){
    res.render('main', { head: headpara });
});

app.get("/about", function(req, res){
    res.render('about', { aboutus: aboutus });
});


app.get("/contact", function(req, res){
    res.render('contact', { contactus: contactus });
});


app.get("/bookingform", function(req, res){
    res.render("bookingform");
  });

app.get("/confirm", function(req, res){
    res.render("confirm");
  });


app.get("/cancel", function(req, res){
    res.render("cancel");
  });


app.get("/doctor", function(req, res){
    res.render("doctor",{
      posts: posts
    });
  });



  app.post("/bookingform", function(req, res){
    const post = {
      title: req.body.postTitle,
      content: req.body.postBody
    };

    posts.push(post);
  
  });

  app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

      res.render("post", {
        title: post.title,
        content: post.content
      });
  });

});


  




app.listen(3000, function(){
    console.log("Server started on port 3000.")
});