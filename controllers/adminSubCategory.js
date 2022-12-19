import express from 'express';
import mongoose from 'mongoose';

import SubCategoryDB from '../models/SubCategory.js';


const router = express.Router();


export const getAllSubCategories = async (req, res) => {

  try {

    const items = await SubCategoryDB.find();
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const createSubCategory = async (req, res) => {

  const { name, category, enabled } = req.body;

  try {

    const newItem = new SubCategoryDB({ name, category, enabled })

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }
}


export const updateSubCategory = async (req, res) => {

  const { id } = req.params;
  const { name, category, enabled } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedItem = { name, category, enabled, _id: id };

  await SubCategoryDB.findByIdAndUpdate(id, updatedItem, { new: true });

  res.json(updatedItem);

}


export const deleteSubCategory = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await SubCategoryDB.findByIdAndRemove(id);

  res.json({ message: "SubCategory deleted successfully." });

}


export default router;