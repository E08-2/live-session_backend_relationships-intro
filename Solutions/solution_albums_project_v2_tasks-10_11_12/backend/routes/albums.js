import express from "express";
import { albumsPost } from "../controllers/albumsController.js";

const router = express.Router();

router.post("/", albumsPost);    // POST /albums

export default router;