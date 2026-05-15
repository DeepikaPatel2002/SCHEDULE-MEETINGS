
const express = require('express');

const cors = require('cors');

const sequelize = require('./utils/db-connection');

const meetingRoutes = require('./routes/meetingRoutes');

const { Slot, Meeting } = require('./models/index');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', meetingRoutes);

sequelize.sync({force:false}).then(async () => {
    
    const count = await Slot.count();
    if (count === 0) {
        await Slot.bulkCreate([
            { time: "2:00 PM", available: 4 },
            { time: "2:30 PM", available: 4 },
            { time: "3:00 PM", available: 4 },
            { time: "3:30 PM", available: 4 }
        ]);
    }
    app.listen(4000, () => console.log("Server running on port 4000"));
}).catch(err => console.log(err));