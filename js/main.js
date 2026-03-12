// Age Verification System
function verifyAge() {
    sessionStorage.setItem('ageVerified', 'true');
    sessionStorage.setItem('verificationTime', new Date().getTime());
    
    // Add encryption animation
    const btn = event.target;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VERIFYING...';
    
    setTimeout(() => {
        window.location.href = 'terminal.html';
    }, 1500);
}

function denyAccess() {
    document.body.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; color: #ff0040; text-align: center; padding: 2rem;">
            <div>
                <i class="fas fa-ban" style="font-size: 5rem; margin-bottom: 1rem;"></i>
                <h1>ACCESS DENIED</h1>
                <p>You must be 18+ to access this system.</p>
                <button onclick="location.reload()" style="margin-top: 2rem; padding: 1rem 2rem; background: #333; color: #fff; border: none; cursor: pointer; font-family: inherit;">
                    Try Again
                </button>
            </div>
        </div>
    `;
}

// Check if already verified
window.onload = function() {
    const verified = sessionStorage.getItem('ageVerified');
    const verifyTime = sessionStorage.getItem('verificationTime');
    
    if (verified === 'true' && verifyTime) {
        // Check if verification is older than 24 hours
        const hoursPassed = (new Date().getTime() - parseInt(verifyTime)) / (1000 * 60 * 60);
        if (hoursPassed < 24) {
            window.location.href = 'terminal.html';
        }
    }
    
    // Load advertisements
    loadAdvertisements();
};

// Advertisement System
function loadAdvertisements() {
    const ads = [
        { company: "CyberShield Pro", text: "Enterprise Security Solutions" },
        { company: "DataGuard Inc", text: "Protect Your Digital Assets" },
        { company: "SecureNet", text: "Next-Gen Firewall Technology" }
    ];
    
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    
    const adElements = document.querySelectorAll('.ad-placeholder');
    adElements.forEach(ad => {
        ad.innerHTML = `
            <span style="color: #ffa500; font-size: 0.8rem;">ADVERTISEMENT</span>
            <div style="font-size: 1.2rem; font-weight: bold; color: #00ff00; margin: 0.5rem 0;">
                ${randomAd.company}
            </div>
            <small style="color: #888;">${randomAd.text}</small>
        `;
    });
}

// Security Check
function checkSecurity() {
    const https = window.location.protocol === 'https:';
    if (!https) {
        console.warn('%c WARNING: Insecure Connection ', 'background: #ff0040; color: white; font-size: 16px');
    }
    return https;
}

// Console Easter Egg
console.log('%c SECURE TERMINAL v2.0 ', 'background: #00ff00; color: black; font-size: 20px; font-weight: bold;');
console.log('%c Restricted Access - Authorized Personnel Only ', 'color: #ff0040; font-size: 12px;');
