import express from 'express';
import mongoose from 'mongoose';
import ImageKit from "imagekit";

import InventoryDB from '../models/Inventory.js';
import dotenv from 'dotenv';


const router = express.Router();


export const getAllProducts = async (req, res) => { 

  try {

      const items = await InventoryDB.find();
      res.status(200).json(items);

  } catch (error) {

      res.status(404).json({ message: error.message });

  }
  
}


export const createProduct = async (req, res) => {

  const { category, subcategory, brand, model, version, price, discount, quantity, processor, ram, storage, screen,
          graphics, details, location, folder, mainImgN, othersImgN, mainImgD, othersImgD, enabled } = req.body;

  finalPrice = Math.ceil( price * (discount / 100) );

  try {

    var imagekit = new ImageKit({
      publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });
      
    let imgN = [mainImgN].concat(othersImgN)
    let imgD = [mainImgD].concat(othersImgD)
    var url = [];

    if (imgN.length > 0) {

      if (folder.trim() === "") {
        folder = "WF";
      };

      for (var i = 0; i < imgN.length; i++) {
        
        let info = { file : imgD[i], //required
                     fileName : imgN[i], //required
                     folder: process.env.IMAGEKIT_MAIN_FOLDER + folder }

        await imagekit.upload(info
        ).then(response => {
          url.push(response.url); 
        }).catch(error => {
          console.log(error);
        });
        
      };

      var mainImg = url[0];
      var othersImg = url.slice(1,);

    } else {

      var mainImg = "";
      var othersImg = [];      

    }

    const newItem = new InventoryDB({ category, subcategory, brand, model, version, price, discount, finalPrice, 
                                      quantity, processor, ram, storage, screen, graphics, details, location, folder, 
                                      mainImg, othersImg, enabled })

    await newItem.save();

    res.status(201).json(newItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }

}


export const updateProduct = async (req, res) => {

  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

  const { category, subcategory, brand, model, version, price, discount, quantity, processor, ram, storage, screen,
          graphics, details, location, folder, mainImg, othersImg, mainImgN, othersImgN, mainImgD, othersImgD, enabled } = req.body;

  finalPrice = Math.ceil( price * (discount / 100) );

  try {

    var imagekit = new ImageKit({
      publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });
      
    let imgN = [mainImgN].concat(othersImgN)
    let imgD = [mainImgD].concat(othersImgD)
    var url = [];

    if ('mainImgN' in req.body | 'othersImgN' in req.body) {

      for (var i = 0; i < imgN.length; i++) {
        
        let info = { file : imgD[i], //required
                    fileName : imgN[i], //required
                    folder: process.env.IMAGEKIT_MAIN_FOLDER + folder }

        await imagekit.upload(info
        ).then(response => {
          url.push(response.url); 
        }).catch(error => {
            console.log(error);
        });
        
      };

      mainImg = url[0];
      othersImg = url.slice(1,);

    }

    let updatedAt = new Date();
    
    const updatedItem = { category, subcategory, brand, model, version, price, discount, finalPrice, quantity, processor, 
                          ram, storage, screen, graphics, details, location, folder, mainImg, othersImg, updatedAt, enabled };

    await InventoryDB.findByIdAndUpdate(id, updatedItem, { new: true });
    
    res.json(updatedItem);

  } catch (error) {

    res.status(409).json({ message: error.message });

  }

}


export const deleteProduct = async (req, res) => {

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

  const item = await InventoryDB.findById(id);

  const { folder } = item;

  if (folder.trim() !== "") {

    var imagekit = new ImageKit({
      publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });

    imagekit.moveFolder({
      sourceFolderPath: process.env.IMAGEKIT_MAIN_FOLDER + folder,
      destinationPath: process.env.IMAGEKIT_TEMP_FOLDER
    }).then(response => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });

  }

  await InventoryDB.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully." });
}


export default router;