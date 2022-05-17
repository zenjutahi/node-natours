const express = require('express');
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  aliasTopTours,
  deleteTour,
  getToursStats,
  getMonthlyPlan
} = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(createTour);

router.route('/stats').get(getToursStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router
  .route('/top-5-tours')
  .get(aliasTopTours, getAllTours);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
