# Table Reservation System Guide

## Overview
Your restaurant website now has a complete table reservation system that saves customer data and allows you to manage reservations through an admin panel.

## How It Works

### For Customers (Frontend)
1. **Reservation Form**: Located on the Contact page (`contact.html`)
2. **Required Fields**:
   - Full Name
   - Phone Number (10 digits)
   - Date (today or future dates only)
   - Time
   - Number of Guests (dropdown selection)
3. **Optional Field**:
   - Special Requests (dietary requirements, celebrations, etc.)

### For Restaurant Staff (Admin Panel)

#### Accessing Admin Panel
1. Open `admin.html` in your browser
2. Enter the admin password (currently set to "admin123")
3. View all reservations in a table format

#### Admin Features
- **View All Reservations**: See complete reservation details
- **Sort by Date/Time**: Reservations are automatically sorted by date and time
- **Update Status**: 
  - Pending (default)
  - Confirmed
  - Cancelled
- **Delete Reservations**: Remove reservations if needed
- **Contact Customers**: Phone numbers are clickable for direct calling

## Database Storage

### What Gets Saved
Each reservation includes:
- Customer name
- Phone number
- Reservation date and time
- Number of guests
- Special requests
- Creation timestamp
- Status (pending/confirmed/cancelled)
- Unique ID

### Database Structure
- **Database**: MongoDB (gtmh)
- **Collection**: reservations
- **Location**: Local MongoDB server (localhost:27017)

## Running the System

### Prerequisites
1. Node.js installed
2. MongoDB installed and running
3. Required npm packages (express, mongodb)

### Starting the Server
```bash
node server.js
```
The server runs on port 3000 by default.

### Accessing the Website
- Main website: `http://localhost:3000`
- Admin panel: `http://localhost:3000/admin.html`

## Security Features
- Form validation (required fields, phone format, date validation)
- Admin password protection
- Error handling for database operations
- Input sanitization

## Customer Experience
1. Customer fills out reservation form
2. Form validates all inputs
3. Success message shows reservation details
4. Data is saved to database
5. Restaurant staff can view and manage the reservation

## Staff Workflow
1. Check admin panel regularly for new reservations
2. Confirm reservations by updating status
3. Contact customers if needed using provided phone numbers
4. Manage special requests and dietary requirements

## Troubleshooting
- Ensure MongoDB is running before starting the server
- Check console for any error messages
- Verify all form fields are filled correctly
- Admin password is case-sensitive

## Customization Options
- Change admin password in server.js
- Modify form fields in contact.html
- Update styling in styles.css
- Add email notifications (future enhancement)

## Data Backup
Regularly backup your MongoDB database to prevent data loss:
```bash
mongodump --db gtmh --out backup/
```

Your reservation system is now fully functional and ready to handle customer bookings!
