

const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/book', meetingController.bookMeeting);
router.get('/slots', meetingController.getSlots);
router.get('/meetings', meetingController.getMeetings);
router.delete('/cancel/:id/:slotId', meetingController.cancelMeeting);

module.exports = router;
