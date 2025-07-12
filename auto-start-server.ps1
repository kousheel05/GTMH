# Garage The Mandi House - Auto Start Server
# PowerShell script to automatically start the server

param(
    [switch]$StartMinimized,
    [switch]$AutoOpen
)

# Configuration
$ProjectPath = "C:\Users\Asus\Desktop\PROJECTS\gtmh"
$ServerScript = "reservation-server.js"
$ServerPort = 5000
$WebsiteUrl = "http://localhost:$ServerPort"
$AdminUrl = "http://localhost:$ServerPort/admin.html"

# Colors for output
$Green = "Green"
$Yellow = "Yellow"
$Red = "Red"
$Cyan = "Cyan"

function Write-ColorOutput {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Test-ServerRunning {
    try {
        $response = Invoke-WebRequest -Uri "$WebsiteUrl/reservations" -TimeoutSec 2 -UseBasicParsing
        return $response.StatusCode -eq 200
    }
    catch {
        return $false
    }
}

function Stop-ExistingServer {
    Write-ColorOutput "🔍 Checking for existing Node.js processes..." $Yellow
    $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
    
    if ($nodeProcesses) {
        Write-ColorOutput "⏹️  Stopping existing Node.js processes..." $Yellow
        $nodeProcesses | Stop-Process -Force
        Start-Sleep -Seconds 2
        Write-ColorOutput "✅ Existing processes stopped" $Green
    } else {
        Write-ColorOutput "✅ No existing Node.js processes found" $Green
    }
}

function Start-Server {
    Write-ColorOutput "🚀 Starting Garage The Mandi House server..." $Cyan
    
    # Change to project directory
    Set-Location $ProjectPath
    
    # Start the server in background
    if ($StartMinimized) {
        $process = Start-Process -FilePath "node" -ArgumentList $ServerScript -WindowStyle Minimized -PassThru
    } else {
        $process = Start-Process -FilePath "node" -ArgumentList $ServerScript -PassThru
    }
    
    # Wait for server to start
    Write-ColorOutput "⏳ Waiting for server to initialize..." $Yellow
    $attempts = 0
    $maxAttempts = 15
    
    do {
        Start-Sleep -Seconds 1
        $attempts++
        Write-Progress -Activity "Starting Server" -Status "Attempt $attempts of $maxAttempts" -PercentComplete (($attempts / $maxAttempts) * 100)
    } while (-not (Test-ServerRunning) -and $attempts -lt $maxAttempts)
    
    Write-Progress -Completed -Activity "Starting Server"
    
    if (Test-ServerRunning) {
        Write-ColorOutput "✅ Server started successfully on port $ServerPort" $Green
        return $true
    } else {
        Write-ColorOutput "❌ Failed to start server after $maxAttempts attempts" $Red
        return $false
    }
}

function Open-Website {
    Write-ColorOutput "🌐 Opening website in default browser..." $Cyan
    Start-Process $WebsiteUrl
    
    # Ask if user wants to open admin panel too
    $openAdmin = Read-Host "Would you like to open the Admin Panel too? (y/n)"
    if ($openAdmin -eq "y" -or $openAdmin -eq "Y") {
        Write-ColorOutput "⚙️  Opening Admin Panel..." $Cyan
        Start-Process $AdminUrl
    }
}

# Main execution
Clear-Host
Write-ColorOutput "========================================" $Cyan
Write-ColorOutput "   GARAGE THE MANDI HOUSE" $Cyan
Write-ColorOutput "   Auto Server Launcher" $Cyan
Write-ColorOutput "========================================" $Cyan
Write-ColorOutput ""

# Check if already running
if (Test-ServerRunning) {
    Write-ColorOutput "✅ Server is already running on port $ServerPort" $Green
    
    if ($AutoOpen) {
        Open-Website
    } else {
        $choice = Read-Host "Server is running. Open website? (y/n)"
        if ($choice -eq "y" -or $choice -eq "Y") {
            Open-Website
        }
    }
} else {
    # Stop any existing servers
    Stop-ExistingServer
    
    # Start new server
    if (Start-Server) {
        Write-ColorOutput ""
        Write-ColorOutput "🎉 Server is now running!" $Green
        Write-ColorOutput "📍 Website: $WebsiteUrl" $Green
        Write-ColorOutput "⚙️  Admin Panel: $AdminUrl" $Green
        Write-ColorOutput ""
        
        if ($AutoOpen) {
            Open-Website
        } else {
            $openNow = Read-Host "Would you like to open the website now? (y/n)"
            if ($openNow -eq "y" -or $openNow -eq "Y") {
                Open-Website
            }
        }
        
        Write-ColorOutput ""
        Write-ColorOutput "ℹ️  Server will continue running in the background" $Yellow
        Write-ColorOutput "ℹ️  To stop the server, close the Node.js window or run:" $Yellow
        Write-ColorOutput "   taskkill /F /IM node.exe" $Yellow
    }
}

Write-ColorOutput ""
Write-ColorOutput "Press any key to exit..." $Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
