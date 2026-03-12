// Security Module
const SecurityModule = {
    // Simple encryption (Base64 + custom algorithm)
    encrypt: function(data) {
        const key = 'SecureTerminal2024!@#';
        let encrypted = '';
        
        for (let i = 0; i < data.length; i++) {
            const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            encrypted += String.fromCharCode(charCode);
        }
        
        return btoa(encrypted);
    },
    
    decrypt: function(encryptedData) {
        const key = 'SecureTerminal2024!@#';
        const decoded = atob(encryptedData);
        let decrypted = '';
        
        for (let i = 0; i < decoded.length; i++) {
            const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            decrypted += String.fromCharCode(charCode);
        }
        
        return decrypted;
    },
    
    // Hash function for passwords
    hashPassword: function(password) {
        let hash = 0;
        const salt = 'TerminalSalt2024';
        const saltedPassword = password + salt;
        
        for (let i = 0; i < saltedPassword.length; i++) {
            const char = saltedPassword.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        return Math.abs(hash).toString(16);
    },
    
    // Generate secure token
    generateToken: function() {
        return Array.from(crypto.getRandomValues(new Uint8Array(32)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },
    
    // Validate session
    validateSession: function() {
        const verified = sessionStorage.getItem('ageVerified');
        const token = sessionStorage.getItem('sessionToken');
        
        if (verified !== 'true' || !token) {
            window.location.href = 'index.html';
            return false;
        }
        
        return true;
    },
    
    // Create session
    createSession: function() {
        const token = this.generateToken();
        sessionStorage.setItem('sessionToken', token);
        sessionStorage.setItem('sessionStart', Date.now());
        return token;
    },
    
    // Check session expiry (24 hours)
    checkSessionExpiry: function() {
        const sessionStart = sessionStorage.getItem('sessionStart');
        if (!sessionStart) return false;
        
        const hoursPassed = (Date.now() - parseInt(sessionStart)) / (1000 * 60 * 60);
        return hoursPassed < 24;
    },
    
    // Secure log (sanitized)
    secureLog: function(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const sanitized = message.replace(/[<>]/g, '');
        
        const logEntry = {
            timestamp,
            level,
            message: sanitized
        };
        
        // Store in encrypted logs
        const logs = JSON.parse(sessionStorage.getItem('secureLogs') || '[]');
        logs.push(logEntry);
        sessionStorage.setItem('secureLogs', JSON.stringify(logs));
        
        console.log(`[${level.toUpperCase()}] ${timestamp}: ${sanitized}`);
    }
};

// Admin credentials (encrypted)
const AdminCredentials = {
    username: 'admin',
    passwordHash: SecurityModule.hashPassword('SecureAdmin2024!'),
    
    verifyCredentials: function(username, password) {
        const passwordHash = SecurityModule.hashPassword(password);
        return username === this.username && passwordHash === this.passwordHash;
    }
};

// Initialize security on load
document.addEventListener('DOMContentLoaded', function() {
    if (!window.location.href.includes('index.html')) {
        if (!SecurityModule.validateSession() || !SecurityModule.checkSessionExpiry()) {
            sessionStorage.clear();
            window.location.href = 'index.html';
        } else {
            SecurityModule.createSession();
        }
    }
});
