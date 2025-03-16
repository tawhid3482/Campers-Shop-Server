import express from 'express'
import validationRequest from '../../middlewares/ValidationRequest'
import { reviewsValidation } from './reviews.validation'
const router = express.Router()
router.post('/reviews',validationRequest(reviewsValidation.reviewValidationSchema),)

router.get('/reviews',)
router.get('/reviews/:id',)
router.delete('/reviews/:id',)
router.patch('/reviews/:id',)