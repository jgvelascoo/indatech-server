import express from 'express';

import { getProducts, 
         getProduct, 
         getLatestProducts, 
         getRecommendationProducts, 
         getBrands,
         getCategories,
         getSubCategories,
         getLocations } from '../controllers/client.js';


const router = express.Router();


router.get('/inventory/search', getProducts);
router.get('/inventory/:id', getProduct);
router.get('/latest', getLatestProducts);
router.get('/recommendations', getRecommendationProducts);
router.get('/brands', getBrands);
router.get('/categories', getCategories);
router.get('/subcategories', getSubCategories);
router.get('/categories', getCategories);
router.get('/locations', getLocations);


export default router;