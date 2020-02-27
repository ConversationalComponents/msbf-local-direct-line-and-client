"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const directline = require("offline-directline");
const app = express();
const port = 5000;
app.use(express.static("client/build"));
directline.initializeRoutes(app, port, "http://127.0.0.1:3978/api/messages");
