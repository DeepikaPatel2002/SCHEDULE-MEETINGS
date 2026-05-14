const Slot = require('./slot');
const Meeting = require('./meeting');


Slot.hasMany(Meeting, { foreignKey: "slotId" });
Meeting.belongsTo(Slot, { foreignKey: "slotId" });

module.exports = { Slot, Meeting };
