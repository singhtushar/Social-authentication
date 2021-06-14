require("dotenv").config();
const express = require("express")
const passport = require("passport");
const googleStrategy = require("passport-google-oauth2")
const cookieSession = require("cookie-session");
require('./passport-setup');

const app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    res.render("index");
})

app.get("/success", (req, res)=>{

})

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/google/callback", passport.authenticate("google", {failureRedirect: '/'}), (req, res)=>{
    const name = req.user.displayName;
    const email = req.user.email;
    const profile_picture = req.user.picture;
    res.render("profile",{
        name,
        email,
        profile_picture
    })
})

app.listen(PORT, ()=>console.log("listening to port 5000"));