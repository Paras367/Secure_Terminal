// Terminal Commands
const commands = {
    help: function() {
        return `
Available Commands:
  help          - Show this help message
  clear         - Clear terminal screen
  about         - About Secure Terminal
  portfolio     - View portfolio gallery
  scan          - Run system security scan
  status        - Show system status
  whoami        - Current user info
  date          - Show current date/time
  contact       - Contact information
  admin         - Access admin panel
  exit          - Logout from system
        `;
    },
    
    clear: function() {
        document.getElementById('terminalOutput').innerHTML = '';
        return '';
    },
    
    about: function() {
        return `
SECURE TERMINAL v2.0
====================
A high-security terminal interface with:
- AES-256 Encryption
- Real-time threat monitoring
- Secure portfolio access
- Admin control panel
- Session management

Developed with security in mind.
        `;
    },
    
    portfolio: function() {
        showPortfolio();
        return 'Opening portfolio gallery...';
    },
    
    scan: function() {
        return `
Running security scan...
[====================] 100%

Scan Results:
✓ System integrity: OK
✓ Firewall: Active
✓ Encryption: Enabled
✓ No threats detected
✓ Last scan: ${new Date().toLocaleString()}

System is secure.
        `;
    },
    
    status: function() {
        return `
System Status:
--------------
Uptime: ${Math.floor(Math.random() * 100)} days
CPU Usage: ${Math.floor(Math.random() * 30 + 10)}%
Memory: 4.2GB / 16GB
Network: Connected (Secure)
Active Connections: ${Math.floor(Math.random() * 50 + 10)}
Threats Blocked: ${Math.floor(Math.random() * 100 + 50)}
        `;
    },
    
    whoami: function() {
        return `
User: authorized_user
Role: Standard Access
IP: [MASKED]
Location: [PROTECTED]
Session: Active
Permissions: Read, Execute
        `;
    },
    
    date: function() {
        return `Current Date/Time: ${new Date().toLocaleString()}`;
    },
    
    contact: function() {
        return `
Contact Information:
-------------------
Email: secure@terminal.system
Support: Available 24/7
Emergency: [REDACTED]

For administrative access, use the 'admin' command.
        `;
    },
    
    admin: function() {
        openAdmin();
        return 'Redirecting to admin panel...';
    },
    
    exit: function() {
        setTimeout(() => {
            logout();
        }, 1000);
        return 'Logging out...';
    }
};

// Terminal Input Handler
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    
    if (!input || !output) return;
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            executeCommand(command);
            this.value = '';
        }
    });
    
    // Keep focus on input
    document.addEventListener('click', function() {
        input.focus();
    });
    
    // Initialize
    SecurityModule.secureLog('Terminal initialized', 'info');
});

function executeCommand(cmd) {
    const output = document.getElementById('terminalOutput');
    const input = document.getElementById('terminalInput');
    
    if (!output) return;
    
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.innerHTML = `<span class="prompt">user@secure-terminal:~$</span> ${cmd}`;
    output.appendChild(commandLine);
    
    // Execute command
    let result = '';
    if (commands[cmd]) {
        result = commands[cmd]();
    } else if (cmd !== '') {
        result = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    // Add result to output
    if (result) {
        const resultLine = document.createElement('div');
        resultLine.className = 'command-output';
        resultLine.textContent = result;
        output.appendChild(resultLine);
    }
    
    // Scroll to bottom
    const terminalWindow = document.getElementById('terminalWindow');
    if (terminalWindow) {
        terminalWindow.scrollTop = terminalWindow.scrollHeight;
    }
    
    // Log command
    if (cmd !== 'clear' && cmd !== '') {
        SecurityModule.secureLog(`Command executed: ${cmd}`, 'command');
    }
}

// Portfolio Functions
function showPortfolio() {
    const modal = document.getElementById('portfolioModal');
    const grid = document.getElementById('portfolioGrid');
    
    if (!modal || !grid) {
        alert('Portfolio feature loading...');
        return;
    }
    
    // Sample portfolio items
    const portfolioItems = [
        { title: "CyberSecurity App", category: "Security", image: "https://via.placeholder.com/300x200/00ff00/000000?text=Security+App", desc: "Advanced threat detection system" },
        { title: "Encrypted Chat", category: "Communication", image: "https://via.placeholder.com/300x200/008f11/ffffff?text=Secure+Chat", desc: "End-to-end encrypted messaging" },
        { title: "Network Monitor", category: "Monitoring", image: "https://via.placeholder.com/300x200/ffa500/000000?text=Network+Tool", desc: "Real-time network analysis" },
        { title: "Data Vault", category: "Storage", image: "https://via.placeholder.com/300x200/0000ff/ffffff?text=Data+Vault", desc: "Secure cloud storage solution" },
        { title: "Firewall Pro", category: "Security", image: "https://via.placeholder.com/300x200/ff0040/ffffff?text=Firewall", desc: "Next-gen firewall system" },
        { title: "Auth System", category: "Authentication", image: "https://via.placeholder.com/300x200/800080/ffffff?text=Auth+System", desc: "Multi-factor authentication" }
    ];
    
    grid.innerHTML = portfolioItems.map(item => `
        <div class="portfolio-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-item-info">
                <h4>${item.title}</h4>
                <p style="color: var(--warning); font-size: 0.8rem;">${item.category}</p>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join('');
    
    modal.style.display = 'block';
    SecurityModule.secureLog('Portfolio accessed', 'access');
}

function closePortfolio() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Navigation Functions
function openAdmin() {
    window.location.href = 'admin.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('portfolioModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + L to clear
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        executeCommand('clear');
    }
    
    // Ctrl + K for help
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        executeCommand('help');
    }
});
