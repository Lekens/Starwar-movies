import express from "express";

const router = express.Router();
router.route('/').get((req, res) => res.redirect('/swagger/documentation'));

export default router;
