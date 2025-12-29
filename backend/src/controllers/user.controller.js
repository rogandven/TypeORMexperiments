"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getUsers(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar todos los usuarios
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updateUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });
    user.username = username || user.username;
    user.email = email || user.email;
    user.rut = rut || user.rut;
    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    await userRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}