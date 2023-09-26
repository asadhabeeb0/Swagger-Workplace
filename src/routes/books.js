const express = require("express");
const router = new express.Router();
const BooksData = require("../model/books")


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           description: The unique code of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         code: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
*/


/**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
*/


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       404:
 *         description: Books not found
*/


router.get("/books", async (req,res) =>{
    try{
        const getBooks = await BooksData.find();
            res.status(200).send(getBooks);
          } catch (e) {
          res.status(404).send("Books not found");
        }
});


/**
 * @swagger
 * /book/{title}:
 *   get:
 *     summary: Get the book by title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The book title
 *     responses:
 *       200:
 *         description: The book description by title
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
*/


router.get("/book/:title", async (req,res) =>{
    try{
                const title = req.params.title;
        const getBook = await BooksData.findOne({title});
            res.status(200).send(getBook);
          } catch (e) {
          res.status(404).send("Book not found");
        }
});


/**
 * @swagger
 * /book:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Authentication required
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Book not created
 */


router.post("/book", async (req, res) => {
  try{
      const addingBook = new BooksData(req.body);
      const insertBook = await addingBook.save();
          res.status(201).send(insertBook);
      } catch (e) {
    console.error(e);
      res.status(500).send("Book not created");
  }
});


/**
 * @swagger
 * /book/{title}:
 *  patch:
 *    summary: Update the book by the title
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: title
 *        schema:
 *          type: string
 *        required: true
 *        description: The book title
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: Book not found
 *      500:
 *        description: Some error happened
*/


router.patch("/book/:title", async (req, res) => {
  try {
    const title = req.params.title;
    console.log("Title:", title);
    const updateBook = await BooksData.findOneAndUpdate(
      { title: title },
      req.body,
      { new: true }
    );
    if (!updateBook) {
      console.log("Book not found");
      res.status(404).send("Book not found");
    } else {
      console.log("Updated Book:", updateBook);
      res.status(200).send(updateBook);
    }
  } catch (e) {
    console.error("Some error happened", e);
    res.status(500).send("Some error happened");
  }
});


/**
 * @swagger
 * /book/{title}:
 *   delete:
 *     summary: Remove the book by title
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The book title
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
*/


router.delete("/book/:title", async (req,res) =>{
    try{
        const title = req.params.title;
        const deleteBook = await BooksData.findOneAndDelete({title}, req.body,{
            new:true
        });
        res.status(200).send(deleteBook);
    }catch(e){
        res.status(404).send("The book was not found");
    }
});

module.exports = router; 