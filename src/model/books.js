const express = require("express");
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    code: {
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    }
})

const BooksData = new mongoose.model("BooksData", bookSchema);

module.exports = BooksData;