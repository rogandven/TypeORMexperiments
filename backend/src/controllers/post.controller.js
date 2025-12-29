"use strict";
import Post from "../entity/post.entity.js";
import { AppDataSource } from "../config/configDb.js";
import User from "../entity/user.entity.js";
import { JoinTable } from "typeorm";

export async function getPosts(req, res) {
  try {
    // Obtener el repositorio de posts y buscar todos los posts
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({relations: {creator: true}});

    res.status(200).json({ message: "Usuarios encontrados: ", data: posts });
  } catch (error) {
    console.error("Error en post.controller.js -> getPosts(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getPostById(req, res) {
  try {
    // Obtener el repositorio de posts y buscar un post por ID
    const postRepository = AppDataSource.getRepository(Post);
    const { id } = req.params;
    const post = await postRepository.findOne({ where: { id } });
    res.status(200).json({ message: "Usuario encontrado: ", data: post });
  } catch (error) {
    console.error("Error en post.controller.js -> getPostById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updatePostById(req, res) {
  try {
    // Obtener el repositorio de posts y buscar un post por ID
    const postRepository = AppDataSource.getRepository(Post);
    const post = await postRepository.findOne({ where: { id } });
    await postRepository.update(post, req.body);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: post });
  } catch (error) {
    console.error("Error en post.controller.js -> updatePostById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deletePostById(req, res) {
  try {
    // Obtener el repositorio de posts y buscar el post por ID
    const postRepository = AppDataSource.getRepository(Post);
    const { id } = req.params;
    const post = await postRepository.findOne({ where: { id } });
    await postRepository.remove(post);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en post.controller.js -> deletePostById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function createPost(req, res) {
  try {
    // Obtener el repositorio de posts y buscar el post por ID
    const postRepository = AppDataSource.getRepository(Post);
    const post = postRepository.create(req.body);
    console.log(post);
    await postRepository.save(post);

    res.status(200).json({ message: "Usuario creado exitosamente." });
  } catch (error) {
    console.error("Error en post.controller.js -> deletePostById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}