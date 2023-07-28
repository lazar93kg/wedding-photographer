const express = require('express');

// gallery controlors
const { upload, album, deletephoto, adminalbum, admindelete } = require('../controllers/gallery.js');

// middleware
const reqAuth = require('../middleware/reqAuth')

// router
const router = express.Router();

// require auth for routes
router.use(reqAuth)

router.post('/upload', upload);
router.post('/album', album);
router.post('/album-admin', adminalbum);
router.delete('/deletephoto', deletephoto);
router.delete('/admindelete', admindelete);





module.exports = router;