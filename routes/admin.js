import express from 'express';

import { getAllProducts, 
         createProduct, 
         updateProduct, 
         deleteProduct } from '../controllers/adminInventory.js';

import { getAllBrands,
         createBrand,
         updateBrand,
         deleteBrand } from '../controllers/adminBrand.js';

import { getAllCategories,
         createCategory,
         updateCategory,
         deleteCategory } from '../controllers/adminCategory.js';

import { getAllSubCategories,
         createSubCategory,
         updateSubCategory,
         deleteSubCategory } from '../controllers/adminSubCategory.js';

import { getAllLocations,
         createLocation,
         updateLocation,
         deleteLocation } from '../controllers/adminLocation.js';

         
import auth from "../middleware/auth.js";


const router = express.Router();

//router.get('/', auth, getAllProducts);
router.get('/', getAllProducts);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.get('/brand/', getAllBrands);
router.post('/brand/', createBrand);
router.patch('/brand/:id', updateBrand);
router.delete('/brand/:id', deleteBrand);

router.get('/category/', getAllCategories);
router.post('/category/', createCategory);
router.patch('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

router.get('/subcategory/', getAllSubCategories);
router.post('/subcategory/', createSubCategory);
router.patch('/subcategory/:id', updateSubCategory);
router.delete('/subcategory/:id', deleteSubCategory);

router.get('/location/', getAllLocations);
router.post('/location/', createLocation);
router.patch('/location/:id', updateLocation);
router.delete('/location/:id', deleteLocation);


export default router;