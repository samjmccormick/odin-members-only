# Members Only Message Board

This project is to meet the Members Only project requirement as part of the NodeJS module of the Odin Project Full Stack Javascript course. See below for project description.

## Project Desctiption from the Odin Project

1. Begin by thinking about how to set up the database models you are going to need to accomplish your goal. You will need users with full-names (first and last), usernames (you can use email for this), passwords and membership-status. Users should be able to create messages that have a title, a timestamp and some text. Your database should keep track of who created each message.
2. Setup your database on PostgreSQL and generate or otherwise create your project skeleton, including the models you designed in the last step.
   Start with a sign-up form so you can get some users into your DB! Don’t forget to sanitize and validate the form fields and secure the passwords with bcrypt. You should add a confirmPassword field to your sign-up form and then validate it using a custom validator.
3. When users sign up, they should not be automatically given membership status! What fun is a private club if just anyone can join? Add a page where members can “join the club” by entering a secret passcode. If they enter the passcode correctly then update their membership status.
4. Create a login-form using passport.js like we did in the last assignment.
5. When a user is logged in give them a link to“Create a new message” (but only show it if they’re logged in!). Create the new-message form.
6. Display all member messages on the home page, but only show the author and date of the messages to other club-members.
7. Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages. You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.
8. By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author and date of each message. Finally, you should have an Admin user that is able to see everything and also has the ability to delete messages. Obviously this is a silly little app, but the things you are practicing (creating and authenticating users and giving users different abilities and permissions) are things that will be very useful to you!
9. When you’re satisfied with your work, deploy your project on your chosen PaaS (list of PaaS providers from the Deployment lesson) and share it below!

## Solution

1. Created ejs pages for each component
   > index, sign up form, join member form, error, posts,
2. s
