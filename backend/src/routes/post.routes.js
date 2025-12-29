"use strict";
import { Router } from "express";
import { getPosts, getPostById, updatePostById, deletePostById, createPost } from "../controllers/post.controller.js";
import { authenticateJwt } from "../middleware/authentication.middleware.js";
import { isAdmin } from "../middleware/authorization.middleware.js";

const router = Router();

// Middleware para autenticar el JWT
// router.use(authenticateJwt);

// Middleware para verificar si el usuario es administrador
// router.use(isAdmin);

// Rutas para obtener usuarios
router.get("/", getPosts);
router.get("/:id", getPostById);
router.put("/:id", updatePostById);
router.delete("/:id", deletePostById);
router.post("/", createPost);

export default router;