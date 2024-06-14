import express from express;
import Book from "../models/bookModel.js"

const router = express.Router();


    //Routes for Save a new book
  router.post("/", async (req, res) => {
    try {
      //quick validation
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Please send all required filed: title, author, publishYear ",
        });
      }
      // create variable for new book
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
  
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
    //Routes for get all books
  router.get("/", async (req, res) => {
      try {
        
        const books = await Book.find({});
    
        return res.status(201).json({
          count: books.length,
          message: "All Books Fetch Successfully !!!",
          data: books
        });
    
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
    });
  
    // Routes for get books by  id (get single products)
  router.get("/:id", async (req, res) => {
      try {
          const { id } = req.params;
        const book = await Book.findById(id);
    
        return res.status(201).json(book);
      //   return res.status(201).json( {
      //     message: " Book Fetch Successfully !!!",
      //     data: book
      //  });
       
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
    });
  
    //Routes for Update a book
  router.put("/:id", async (req, res) => {
       try {
          if (!req.body.title || !req.body.author || !req.body.publishYear) {
              return res.status(400).send({
                message: "Please send all required filed: title, author, publishYear ",
              });
            }
              //destructure the id
              const { id } = req.params;
  
              const result = await Book.findByIdAndUpdate(id, req.body);
              if (!result) {
                  return res.status(404).json({
                      message: "Book not found",
                    });
              }
              return res.status(200).json({
                  message: "Book updated successfully",
                });
  
          
       } catch (error) {
          console.log(error.message);
          res.status(500).send({ message: error.message });
        }
     })
  
    //routes for delete a book
   router.delete("/:id", async (req, res) => {
      try {
          
          const { id } = req.params;
           const result = await Book.findByIdAndDelete(id);
  
           if (!result) {
              return res.status(404).json({
                  message: "Book not found",
                });
          }
          return res.status(200).json({
              message: "Book deleted successfully",
            })
  
      } catch (error) {
          console.log(error.message);
          res.status(500).send({ message: error.message });
        }
     })
  
     export default router;