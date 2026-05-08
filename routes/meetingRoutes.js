
const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.get('/slots', meetingController.getSlots);
router.get('/meetings', meetingController.getMeetings);
router.post('/book', meetingController.bookMeeting);
router.post('/cancel', meetingController.cancelMeeting);

module.exports = router;