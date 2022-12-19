import express from 'express';
import mongoose from 'mongoose';

import CategoryDB from '../models/Category.js';


const router = express.Router();


export const getAllCategories = async (req, res) => {

  try {

    const items = await CategoryDB.find();
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const createCategory = async (req, res) => {

  const { name, enabled } = req.body;

  try {

    const newItem = new CategoryDB({ name, enabled })

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }
}


export const updateCategory = async (req, res) => {

  const { id } = req.params;
  const { name, enabled } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedItem = { name, enabled, _id: id };

  await CategoryDB.findByIdAndUpdate(id, updatedItem, { new: true });

  res.json(updatedItem);

}


export const deleteCategory = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await CategoryDB.findByIdAndRemove(id);

  res.json({ message: "Category deleted successfully." });

}


export default router;