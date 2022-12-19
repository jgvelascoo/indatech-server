import express from 'express';
import mongoose from 'mongoose';

import LocationDB from '../models/Location.js';


const router = express.Router();


export const getAllLocations = async (req, res) => {

  try {

    const items = await LocationDB.find();
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const createLocation = async (req, res) => {

  const { name, enabled } = req.body;

  try {

    const newItem = new LocationDB({ name, enabled })

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }
}


export const updateLocation = async (req, res) => {

  const { id } = req.params;
  const { name, enabled } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedItem = { name, enabled, _id: id };

  await LocationDB.findByIdAndUpdate(id, updatedItem, { new: true });

  res.json(updatedItem);

}


export const deleteLocation = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await LocationDB.findByIdAndRemove(id);

  res.json({ message: "Location deleted successfully." });

}


export default router;