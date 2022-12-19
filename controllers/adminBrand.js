import express from 'express';
import mongoose from 'mongoose';

import BrandDB from '../models/Brand.js';


const router = express.Router();


export const getAllBrands = async (req, res) => {

  try {

    const items = await BrandDB.find();
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const createBrand = async (req, res) => {

  const { name, category, subcategory, enabled } = req.body;

  try {

    const newItem = new BrandDB({ name, category, subcategory, enabled })

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }
}


export const updateBrand = async (req, res) => {

  const { id } = req.params;
  const { name, category, subcategory, enabled } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedItem = { name, category, subcategory, enabled, _id: id };

  await BrandDB.findByIdAndUpdate(id, updatedItem, { new: true });

  res.json(updatedItem);

}


export const deleteBrand = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await BrandDB.findByIdAndRemove(id);

  res.json({ message: "Brand deleted successfully." });

}


export default router;