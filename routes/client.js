import express from 'express';

import { getProducts, 
         getProduct, 
         getLatestProducts, 
         getRecommendationProducts, 
         getBrands,
         getCategories,
         getSubCategories,
         getLocations,
         getOfferProducts,
         getLatestOfferProducts } from '../controllers/client.js';


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
router.get('/offers/search', getOfferProducts);
router.get('/offers/latest', getLatestOfferProducts);


export default router;