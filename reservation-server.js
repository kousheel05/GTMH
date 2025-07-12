const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Simple password protection for admin page
const adminPassword = 'admin123';

app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === adminPassword) {
        res.send({ success: true });
    } else {
        res.status(401).send({ success: false });
    }
});

// File-based storage for reservations
const reservationsFile = path.join(__dirname, 'reservations.json');

// Initialize reservations file if it doesn't exist
if (!fs.existsSync(reservationsFile)) {
    fs.writeFileSync(reservationsFile, JSON.stringify([], null, 2));
    console.log('Created reservations.json file');
}

// Helper functions for file operations
function readReservations() {
    try {
        const data = fs.readFileSync(reservationsFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading reservations:', err);
        return [];
    }
}

function writeReservations(reservations) {
    try {
        fs.writeFileSync(reservationsFile, JSON.stringify(reservations, null, 2));
        return true;
    } catch (err) {
        console.error('Error writing reservations:', err);
        return false;
    }
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Routes
app.post('/reserve', (req, res) => {
    try {
        const { name, date, time, guests, phone, message } = req.body;
        
        // Validation
        if (!name || !date || !time || !guests || !phone) {
            return res.status(400).send({ error: 'All required fields must be filled' });
        }

        // Create reservation object
        const reservation = {
            _id: generateId(),
            name: name.trim(),
            date,
            time,
            guests,
            phone: phone.trim(),
            message: message ? message.trim() : '',
            createdAt: new Date().toISOString(),
            status: 'pending'
        };

        // Read existing reservations
        const reservations = readReservations();
        
        // Add new reservation
        reservations.push(reservation);
        
        // Save to file
        if (writeReservations(reservations)) {
            console.log('New reservation created:', {
                id: reservation._id,
                name: reservation.name,
                date: reservation.date,
                time: reservation.time,
                guests: reservation.guests,
                phone: reservation.phone
            });

            res.send({ 
                message: 'Reservation successful!', 
                id: reservation._id,
                reservation: {
                    name: reservation.name,
                    date: reservation.date,
                    time: reservation.time,
                    guests: reservation.guests
                }
            });
        } else {
            res.status(500).send({ error: 'Failed to save reservation. Please try again.' });
        }
    } catch (err) {
        console.error('Reservation error:', err);
        res.status(500).send({ error: 'Failed to create reservation. Please try again.' });
    }
});

app.get('/reservations', (req, res) => {
    try {
        const reservations = readReservations();
        console.log(`Fetched ${reservations.length} reservations`);
        res.send(reservations);
    } catch (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).send({ error: 'Failed to fetch reservations' });
    }
});

app.put('/reservations/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).send({ error: 'Invalid status' });
        }
        
        const reservations = readReservations();
        const reservationIndex = reservations.findIndex(r => r._id === id);
        
        if (reservationIndex !== -1) {
            reservations[reservationIndex].status = status;
            reservations[reservationIndex].updatedAt = new Date().toISOString();
            
            if (writeReservations(reservations)) {
                console.log(`Reservation ${id} status updated to ${status}`);
                res.send({ message: 'Status updated successfully' });
            } else {
                res.status(500).send({ error: 'Failed to update status' });
            }
        } else {
            res.status(404).send({ error: 'Reservation not found' });
        }
    } catch (err) {
        console.error('Status update error:', err);
        res.status(500).send({ error: 'Failed to update status' });
    }
});

app.delete('/reservations/:id', (req, res) => {
    try {
        const { id } = req.params;
        const reservations = readReservations();
        const filteredReservations = reservations.filter(r => r._id !== id);
        
        if (filteredReservations.length < reservations.length) {
            if (writeReservations(filteredReservations)) {
                console.log(`Reservation ${id} deleted`);
                res.send({ message: 'Reservation deleted successfully' });
            } else {
                res.status(500).send({ error: 'Failed to delete reservation' });
            }
        } else {
            res.status(404).send({ error: 'Reservation not found' });
        }
    } catch (err) {
        console.error('Delete reservation error:', err);
        res.status(500).send({ error: 'Failed to delete reservation' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Garage The Mandi House Server running at http://localhost:${port}`);
    console.log(`📊 Admin panel: http://localhost:${port}/admin.html`);
    console.log(`💾 Reservations stored in: ${reservationsFile}`);
});
