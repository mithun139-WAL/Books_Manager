const express = require('express');
const multer = require('multer');
const fs = require('fs');
const schedule = require('node-schedule');
const {param, body, validationResult} = require('express-validator');
const router = express.Router();
const Book = require('../models').Books;
const Category = require('../models').Categories;
const authentication = require('../middlewares/AuthenticationMiddleware');
let uniqueName = null;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage: storage,
  limits: {fieldNameSize: 1000, fileSize: 102400000},
  fileFilter: (req, file, cb) => {
    console.log('File filter running..');
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png .jpg and .jpeg are allwed'));
    }
  },
});
schedule.scheduleJob('0 19 * * *', async () => {
  const books = await Book.findAll();
  try {
    books.map((val, index) => {
      Book.update({price: val.price * 10});
    });
  } catch (err) {
    console.log(err);
  }
});

router.post(
  '/add',
  authentication,
  upload.single('image'),
  async (req, res) => {
    console.log(req.body);
    const {
      name,
      isbn_no,
      author,
      edition,
      publication,
      price,
      availability,
      image,
      categoryId,
    } = req.body;
    try {
      const category = await Category.findOne({where: {id: categoryId}});
      const book = await Book.create({
        name,
        isbn_no,
        author,
        edition,
        publication,
        price,
        availability,
        image: `/uploads/${uniqueName}`,
        categoryId: category.id,
      });
      console.log(book);
      return res.status(201).json(book);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);
router.get('/', authentication, async (req, res) => {
  try {
    const books = await Book.findAll({include: [Category]});
    return res.status(200).json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get(
  '/:id',
  authentication,
  param('id').isInt().withMessage('Id params should only be integers'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
    } else {
      try {
        const book = await Book.findOne({
          where: {id: req.params.id},
          include: [Category],
        });
        return res.status(200).json(book);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    }
  }
);

router.delete(
  '/del/:id',
  authentication,
  param('id').isInt().withMessage('Id params should only be integers'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
    } else {
      try {
        const book = await Book.findOne({where: {id: req.params.id}});
        if (!book) {
          return res.status(404).send({message: 'Book not found'});
        } else {
          try {
            await book.destroy();
            return res.json({message: 'Book deleted!'});
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Something went wrong!'});
      }
    }
  }
);
router.put(
  '/edit/:id',
  param('id').isInt().withMessage('Id params should only be integers'),
  body('name').trim(),
  body('isbn_no')
    .isNumeric({min: 13, max: 13})
    .withMessage('ISBN should contain 13 digits'),
  authentication,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    const {
      name,
      isbn_no,
      author,
      edition,
      publication,
      price,
      availability,
      categoryId,
    } = req.body;
    if (!errors.isEmpty()) {
      res.status(400).json(errors);
    } else {
      try {
        const book = await Book.findOne({where: {id: req.params.id}});
        const category = await Category.findOne({where: {id: categoryId}});
        book.name = name;
        book.isbn_no = isbn_no;
        book.author = author;
        book.edition = edition;
        book.publication = publication;
        book.price = price;
        book.availability = availability;
        book.categoryId = category.id;
        await book.save();
        return res.json(book);
      } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Something went wrong!'});
      }
    }
  }
);
module.exports = router;
