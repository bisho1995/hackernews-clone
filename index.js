var http = require("http");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var MongoStore = require("connect-mongo")(session);
