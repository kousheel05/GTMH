# Auto-Start Server Setup Guide

## 🚀 Multiple Ways to Auto-Start Your Website

I've created several solutions for automatically starting your server when you want to access the website. Choose the method that works best for you:

---

## Method 1: Simple Double-Click Launcher (Recommended)

### Files Created:
- `launch-website.bat` - Main launcher script
- `launcher.html` - Visual launcher with status checking

### How to Use:
1. **Double-click `launch-website.bat`**
   - Automatically stops any existing server
   - Starts the reservation server
   - Opens website in browser
   - Shows server status

2. **Or open `launcher.html` in browser**
   - Visual interface with server status
   - Automatic server detection
   - Direct links to website and admin panel

---

## Method 2: Desktop Shortcut

### Setup:
1. **Run `create-desktop-shortcut.bat`**
   - Creates a desktop shortcut
   - One-click access to your website

2. **Double-click the desktop shortcut**
   - Launches server and website automatically

---

## Method 3: Windows Startup (Auto-start with Windows)

### Setup:
1. **Copy `startup-server.bat` to Windows Startup folder**
   ```
   Press Win + R
   Type: shell:startup
   Copy startup-server.bat to this folder
   ```

2. **Server will start automatically when Windows boots**
   - Runs silently in background
   - No popup windows
   - Server ready when you need it

---

## Method 4: PowerShell Advanced Launcher

### How to Use:
1. **Right-click `auto-start-server.ps1`**
2. **Select "Run with PowerShell"**
3. **Features:**
   - Colored output and progress bars
   - Automatic server detection
   - Option to open admin panel
   - Detailed status information

---

## Method 5: Browser-Based Launcher

### How to Use:
1. **Bookmark `launcher.html`**
2. **Open bookmark when you want to use website**
3. **Features:**
   - Real-time server status checking
   - Automatic port detection
   - Visual interface
   - Manual setup instructions

---

## 🔧 Quick Setup Instructions

### For Immediate Use:
1. **Double-click `launch-website.bat`**
2. **Wait for "Server started" message**
3. **Website opens automatically**

### For Desktop Access:
1. **Run `create-desktop-shortcut.bat`**
2. **Use desktop shortcut anytime**

### For Auto-Start with Windows:
1. **Press Win + R, type `shell:startup`**
2. **Copy `startup-server.bat` to startup folder**
3. **Restart computer to test**

---

## 📋 What Each File Does

| File | Purpose |
|------|---------|
| `launch-website.bat` | Main launcher - starts server and opens website |
| `launcher.html` | Visual launcher with status checking |
| `reservation-server.js` | The actual server (runs on port 5000) |
| `auto-start-server.ps1` | Advanced PowerShell launcher |
| `startup-server.bat` | Silent startup script for Windows |
| `create-desktop-shortcut.bat` | Creates desktop shortcut |

---

## 🌐 Access URLs

Once server is running:
- **Main Website**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin.html (Password: admin123)
- **Contact/Reservations**: http://localhost:5000/contact.html

---

## 🛠️ Troubleshooting

### If Server Won't Start:
1. **Check if Node.js is installed**: `node --version`
2. **Check if port 5000 is free**: `netstat -ano | findstr :5000`
3. **Kill existing processes**: `taskkill /F /IM node.exe`

### If Website Won't Open:
1. **Verify server is running**: Check for "Server running" message
2. **Try different browser**: Chrome, Firefox, Edge
3. **Check firewall**: Allow Node.js through Windows Firewall

### If Admin Panel Shows Error:
1. **Ensure server is running on port 5000**
2. **Clear browser cache**
3. **Try incognito/private browsing mode**

---

## 🎯 Recommended Workflow

### Daily Use:
1. **Double-click desktop shortcut** (after running create-desktop-shortcut.bat)
2. **Website opens automatically**
3. **Server runs in background**

### Development/Testing:
1. **Use `launcher.html`** for visual status
2. **Monitor server in command window**
3. **Use PowerShell script for detailed info**

### Production/Always Available:
1. **Add to Windows startup** using startup-server.bat
2. **Server always ready**
3. **Just open browser to localhost:5000**

---

Your website will now start automatically with any of these methods! 🎉
