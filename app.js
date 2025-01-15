//password encryptor
const bcrypt = require("bcryptjs");
// .env file for environmental variables that is ignored by git
require("dotenv").config();
const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
