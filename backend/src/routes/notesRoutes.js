import express from "express";
import protectRoute from "../middleware/auth.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, updateNote);
router.delete("/:id", protectRoute, deleteNote);

export default router;