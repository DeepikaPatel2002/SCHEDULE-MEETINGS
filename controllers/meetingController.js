
const Slot = require('../models/slot');
const Meeting = require('../models/meeting');

exports.getSlots = async (req, res) => {
    try {
        const slots = await Slot.findAll({include:Meeting});
        res.json(slots);
    }
     catch (err) { 
        res.status(500).json(err);
     }
};

exports.getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.findAll({include:Slot});
        res.json(meetings);
    } 
    catch (err) { 
        res.status(500).json(err); 
    }
};

exports.bookMeeting = async (req, res) => {
    const { slotId, name, email,meetingLink } = req.body;
    try {
        const slot = await Slot.findByPk(slotId);
        if (slot && slot.available > 0) {
            await slot.update({ available: slot.available - 1 }); 
            const meeting = await Meeting.create({
                userName: name,
                userEmail: email,
                slotId: slotId,
                slotTime: slot.time,
                meetingLink:meetingLink
            });
            res.status(201).json(meeting);
        } else {
            res.status(400).json({ message: "No slots left!" });
        }
    } 
    catch (err) { 
        res.status(500).json(err);
     }
};

exports.cancelMeeting = async (req, res) => {
    const { id, slotId } = req.body;
    try {
        const slot = await Slot.findByPk(slotId);
        await slot.update({ available: slot.available + 1 }); 
        await Meeting.destroy({ where: { id: id } });
        res.json({ message: "Deleted" });
    } 
    catch (err) { 
        res.status(500).json(err);
     }
};