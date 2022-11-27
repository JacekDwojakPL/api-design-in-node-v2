import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import { validateInputs } from './utils/middlewares';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.put('/product/:id', [body('name').isString(), validateInputs], updateProduct);
router.post('/product', [body('name').isString(), validateInputs], createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.post('/update', [body('title').isString(), body('body').isString(), body('productId').isString()], createUpdate);
router.put(
  '/update/:id',
  [
    body('title').optional().isString(),
    body('body').optional().isString(),
    body('version').optional().isString(),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
    validateInputs,
  ],
  updateUpdate
);
router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', [body('name').optional().isString(), validateInputs], (req, res) => {});
router.post('/updatepoint', [body('updateId').exists().isString(), body('name').isString(), validateInputs], (req, res) => {});
router.delete('/updatepoint/:id', () => {});

router.use((error, req, res, next) => {
  if (error.type === 'auth') {
    res.status(401);
    return res.json({ error: 'not authorized' });
  }

  if (error.type === 'input') {
    res.status(400);
    return res.json({ error: 'invalid input' });
  }

  res.status(500);
  return res.json({ data: 'internal server error' });
});

export default router;
