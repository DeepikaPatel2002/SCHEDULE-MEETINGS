const apiURL = "http://localhost:4000/api";
let selectedSlotId = null;

// Page load hone par data show
window.addEventListener('DOMContentLoaded', () => {
    loadSlots();
    loadMeetings();
});

// 1. Slots load karna
async function loadSlots() {
    try {
        const res = await axios.get(`${apiURL}/slots`);
        const container = document.getElementById('slotsContainer');

        container.innerHTML = res.data.map(slot => `
            <div class="slot-box" onclick="openBooking(${slot.id})">
                <strong>${slot.time}</strong><br>
                <span>${slot.available} Available</span>
            </div>
        `).join(''); 
    } 
    catch (err) { 
        console.log("Error loading slots");
     }
}

// 2. Booking Form kholna
function openBooking(id) {
    selectedSlotId = id;
    document.getElementById('bookingModal').style.display = 'block'; 
}

// 3. Meeting book karna
document.getElementById('bookBtn').addEventListener('click', async () => {

    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const link = document.getElementById('linkInput').value;

    if(!name || !email) 
        return alert("Please fill details!");

    try {
        await axios.post(`${apiURL}/book`, { 
            slotId: selectedSlotId, 
            name: name, 
            email: email,
            meetingLink:link
        });
        
        alert(`Slot confirmed ${name}!`); 
        document.getElementById('bookingModal').style.display = 'none';
        loadSlots(); 
        loadMeetings(); 
    } 
    catch (err) { 
        alert("Booking failed!"); 
    }
});

// 4. Scheduled meetings dikhana
async function loadMeetings() {
    try {
        const res = await axios.get(`${apiURL}/meetings`);
        const container = document.getElementById('meetingList');

        container.innerHTML = res.data.map(m => `
          
            <div class="meeting-card">
                <p>Hi ${m.userName},</p>
            
                <p>Join here:<a href="${m.meetingLink}" target="_blank">${m.meetingLink}</a></p>
                <button class="cancel-btn" onclick="cancelMeeting(${m.id}, ${m.slotId})">Cancel</button>
            </div>

        `).join(''); 

    }
     catch (err) {
         console.log("Error loading meetings");
         }
}

// 5. Cancel logic
async function cancelMeeting(id, slotId) {
    try {
        await axios.delete(`${apiURL}/cancel/${id}/${slotId}`);
        loadSlots(); 
        loadMeetings();
    } catch (err) { 
        alert("Cancel error!"); 
    }
}

 
