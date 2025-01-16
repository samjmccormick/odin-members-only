//password encryptor
const bcrypt = require("bcryptjs");
// .env file for environmental variables that is ignored by git
require("dotenv").config();
const path = require("node:path");
//express
const express = require("express");
//express-session - saves session information (confirm log-in and maintain log-in status)
const session = require("express-session");
//passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//need pool for the query in the passport localstrategy
const pool = require("./db/pool");

//called when asking passport to authenticate
// this wasn't working because it explitity required a username field, it wouldn't work with email put in directly
// had to specify usernameField: 'email'
passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // Specify email as the username field
    async (email, password, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        const user = rows[0];

        if (!user) {
          // Mitigate timing attacks by performing bcrypt comparison with a dummy hash
          await bcrypt.compare(password, "$2b$10$dummyHash");
          return done(null, false, { message: "Incorrect email or password" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        // Authentication successful
        return done(null, user);
      } catch (err) {
        console.error("Error during authentication", err);
        return done(err);
      }
    }
  )
);

//receives user object from sucecssful login and stores it's id property in session data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//upon another request with a matching session this will retrieve the id stored in session data and then queries the database for specified user
// then done(null, user) attaches that user object to req.user so we can access it
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();
//set views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//session settings
//secret: This is the secret used to sign the session ID cookie.
//saved in environmental variable for security
//resave: Forces the session to be saved back to the session store, even if the session was never modified during the request.
//saveUninitiated: Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());

//currentUser middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//url encoding middleware (it was set to false in the authentication lesson, need to confirm that)
app.use(express.urlencoded({ extended: true }));

//routing for static pages eg styles.css
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// router links
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const postsRouter = require("./routes/postsRouter");
const joinRouter = require("./routes/joinRouter");

// routers
app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/posts", postsRouter);
app.use("/join", joinRouter);

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/",
  })
);

app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//listening port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
