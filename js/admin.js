// Admin Login
function adminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUser').value;
    const password = document.getElementById('adminPass').value;
    const btn = event.target.querySelector('button[type="submit"]');
    
    // Encrypt credentials before checking
    const encryptedPass = SecurityModule.encrypt(password);
    SecurityModule.secureLog('Admin login attempt', 'security');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHENTICATING...';
    btn.disabled = true;
    
    setTimeout(() => {
        if (AdminCredentials.verifyCredentials(username, password)) {
            // Successful login
            sessionStorage.setItem('adminAuth', 'true');
            sessionStorage.setItem('adminLoginTime', Date.now());
            
            SecurityModule.secureLog('Admin login successful', 'success');
            
            document.getElementById('adminLogin').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            
            loadAdminData();
        } else {
            // Failed login
            SecurityModule.secureLog('Admin login failed', 'error');
            
            btn.innerHTML = '<i class="fas fa-times"></i> ACCESS DENIED';
            btn.style.background = '#ff0040';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> AUTHENTICATE';
                btn.style.background = '';
                btn.disabled = false;
                alert('Invalid credentials! Access denied.');
            }, 1500);
        }
    }, 2000);
    
    return false;
}

function adminLogout() {
    if (confirm('Logout from admin panel?')) {
        sessionStorage.removeItem('adminAuth');
        SecurityModule.secureLog('Admin logout', 'info');
        window.location.href = 'terminal.html';
    }
}

function loadAdminData() {
    // Simulate loading admin data
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        card.style.animation = 'slideIn 0.5s ease-out';
    });
    
    SecurityModule.secureLog('Admin dashboard loaded', 'info');
}

function executeAdminCommand() {
    const input = document.getElementById('adminCommand');
    const output = document.getElementById('adminOutput');
    const cmd = input.value.trim();
    
    if (!cmd) return;
    
    const timestamp = new Date().toLocaleString();
    let response = '';
    
    // Admin commands
    switch(cmd.toLowerCase()) {
        case 'users':
            response = `Active Users: 1,247\nNew Today: 45\nBanned: 12`;
            break;
        case 'logs':
            response = `Security Logs:\n[${timestamp}] System scan completed\n[${timestamp}] 3 threats blocked\n[${timestamp}] Backup completed`;
            break;
        case 'system':
            response = `System Info:\nOS: SecureOS v2.0\nUptime: 45 days\nLoad: 34%`;
            break;
        case 'backup':
            response = `Initiating backup...\nBackup completed successfully.\nSize: 2.4GB`;
            break;
        case 'clear':
            output.innerHTML = '';
            input.value = '';
            return;
        default:
            response = `Unknown command: ${cmd}\nAvailable: users, logs, system, backup, clear`;
    }
    
    const entry = document.createElement('div');
    entry.innerHTML = `<strong style="color: var(--primary);">[${timestamp}]</strong> ${cmd}\n<span style="color: var(--light);">${response}</span>\n`;
    output.appendChild(entry);
    
    output.scrollTop = output.scrollHeight;
    input.value = '';
    
    SecurityModule.secureLog(`Admin command: ${cmd}`, 'admin');
}

// Check admin auth on load
window.onload = function() {
    const adminAuth = sessionStorage.getItem('adminAuth');
    
    if (adminAuth === 'true') {
        // Check if session expired (8 hours for admin)
        const loginTime = sessionStorage.getItem('adminLoginTime');
        if (loginTime) {
            const hoursPassed = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60);
            if (hoursPassed > 8) {
                sessionStorage.removeItem('adminAuth');
                return;
            }
        }
        
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        loadAdminData();
    }
    
    // Add enter key support for admin command
    const adminInput = document.getElementById('adminCommand');
    if (adminInput) {
        adminInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeAdminCommand();
            }
        });
    }
};

// Auto-save logs
setInterval(function() {
    if (sessionStorage.getItem('adminAuth') === 'true') {
        SecurityModule.secureLog('Admin session active', 'heartbeat');
    }
}, 60000); // Every minute
