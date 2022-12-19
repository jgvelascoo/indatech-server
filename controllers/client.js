import express from 'express';

import InventoryDB from '../models/Inventory.js';
import CategoryDB from '../models/Category.js';
import SubCategoryDB from '../models/SubCategory.js';
import BrandDB from '../models/Brand.js';
import LocationDB from '../models/Location.js';


const router = express.Router();


export const getCategories = async (req, res) => {

  try {

    const items = await CategoryDB.find({ enabled: true }).sort('name');
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getSubCategories = async (req, res) => {

  try {

    const items = await SubCategoryDB.find({ enabled: true }).sort('name');
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getBrands = async (req, res) => {

  try {

    const items = await BrandDB.find({ enabled: true }).sort('name');
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getLocations = async (req, res) => {

  try {

    const items = await LocationDB.find({ enabled: true }).sort('name');
    res.status(200).json(items);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getProducts = async (req, res) => {

  const SORT_CASES = {
    'reciente': '-createdAt -_id',
    'descendente': '-price -id',
    'ascendente': 'price -id'
  }

  try {

    const LIMIT = 8;
    let query = { ...req.query };
    let filters = { ...req.query };
    const sort = query.sort || 'reciente';
    const page = query.page || 1;
    delete query.page;
    delete query.sort;
    const startIndex = (Number(page) - 1) * LIMIT;
    
    if (query.hasOwnProperty('minPrice') && query.hasOwnProperty('maxPrice')) {

      const minPrice = Number(query.minPrice);
      const maxPrice = Number(query.maxPrice);
      delete query.minPrice;
      delete query.maxPrice;
      query = { $and: [query, { $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }] }] };

    }

    const count = await InventoryDB.countDocuments(query);
    const items = await InventoryDB.find(query).sort(SORT_CASES[sort]).skip(startIndex).limit(LIMIT);
    res.status(200).json({ data: items, currentPage: Number(page), numberOfPages: Math.ceil(count / LIMIT), filters });

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getProduct = async (req, res) => {

  try {

    const { id } = req.params;
    const item = await InventoryDB.findById(id);
    res.status(200).json(item);

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getLatestProducts = async (req, res) => {

  try {

    const LIMIT = 3;
    const items = await InventoryDB.find().sort('-createdAt -_id').limit(LIMIT);
    res.status(200).json({ items });

  } catch (error) {

    res.status(404).json({ message: error.message });

  }

}


export const getRecommendationProducts = async (req, res) => {

  try {

    const LIMIT = 3;
    let query = { ...req.query };
    const reqId = query.id;
    delete query.id;
    query = { $and: [query, { _id: { $ne: reqId } }] };

    const initialReq = await InventoryDB.countDocuments(query);
    let items = await InventoryDB.find(query).sort('-createdAt -_id').limit(LIMIT);
    if (initialReq >= LIMIT) {
      res.status(200).json({ items });
    } else {
      let reqIdList = [reqId];
      if (initialReq > 0) {
        for (let i in items) {
          reqIdList.push(items[i]._id);
        }
      }
      const latestItems = await InventoryDB.find({ _id: { $nin: reqIdList } }).sort('-createdAt -_id').limit(LIMIT - initialReq);
      items = items.concat(latestItems);
      res.status(200).json({ items });
    }

  } catch (error) {
    res.status(404).json({ message: error.message });
  }

}


export default router;