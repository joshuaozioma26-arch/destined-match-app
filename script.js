// ============================================
// DESTINED — MAIN SCRIPT
// ============================================

console.log("❤️‍🔥 Destined — Connecting your fate...");

// ============================================
// STAR GENERATOR FOR LANDING PAGE
// ============================================

function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;

    const starCount = 160;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 5;
        
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.setProperty('--duration', duration + 's');
        star.style.animationDelay = delay + 's';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(star);
    }
}

// ============================================
// ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Destined loaded successfully!");
    
    // Create stars for landing page
    createStars();

    // Check if config.js is loaded
    if (typeof BOT_TOKEN !== 'undefined') {
        console.log("✅ Bot Token loaded.");
    } else {
        console.warn("⚠️ Bot Token not found. Check config.js");
    }

    if (typeof BOT_ID !== 'undefined') {
        console.log("✅ Bot ID loaded.");
    } else {
        console.warn("⚠️ Bot ID not found. Check config.js");
    }

    // Check tiers
    if (typeof TIERS !== 'undefined') {
        console.log("✅ Tiers loaded:");
        for (let tier in TIERS) {
            let v = TIERS[tier].verified ? "✅ Verified" : "❌ Not Verified";
            console.log(`   ${TIERS[tier].emoji} ${tier}: ${TIERS[tier].name} — ${v}`);
        }
    }

    // Check verification rules
    if (typeof VERIFICATION_RULES !== 'undefined') {
        console.log("✅ Verification Rules loaded.");
        console.log("   Checks:", VERIFICATION_RULES.checks.join(", "));
        console.log("   Retry Days:", VERIFICATION_RULES.retry_days);
    }

    // Load first profile if on home page
    if (document.getElementById('swipeCard')) {
        loadProfile(currentProfileIndex);
    }
});

// ============================================
// FUNCTION: Check if user can be verified
// ============================================
function canBeVerified(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key].needsVerification;
    }
    return false;
}

// ============================================
// FUNCTION: Check if user is verified
// ============================================
function isVerified(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key].verified;
    }
    return false;
}

// ============================================
// FUNCTION: Get tier details
// ============================================
function getTierDetails(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key];
    }
    return TIERS.FREE;
}

// ============================================
// FUNCTION: Start verification
// ============================================
function startVerification(userId, tier) {
    if (!canBeVerified(tier)) {
        return {
            success: false,
            message: "Your tier does not require verification."
        };
    }

    console.log(`🔍 Starting verification for user: ${userId}`);
    console.log("📋 Running checks:", VERIFICATION_RULES.checks.join(", "));

    return {
        success: true,
        message: "Verification started. You will be notified in 24-48 hours.",
        checks: VERIFICATION_RULES.checks,
        retry_days: VERIFICATION_RULES.retry_days
    };
}

// ============================================
// FUNCTION: Complete verification
// ============================================
function completeVerification(userId, passed) {
    if (passed) {
        console.log(`✅ User ${userId} verified!`);
        return {
            success: true,
            verified: true,
            message: "✅ Verification complete! You are now verified.",
            badge: VERIFICATION_RULES.badge
        };
    } else {
        console.log(`❌ User ${userId} verification failed.`);
        return {
            success: false,
            verified: false,
            message: "❌ Verification failed. Try again in " + VERIFICATION_RULES.retry_days + " days.",
            retry_days: VERIFICATION_RULES.retry_days
        };
    }
}

// ============================================
// FUNCTION: Get verified badge HTML
// ============================================
function getVerifiedBadge(tier) {
    if (isVerified(tier)) {
        return '<span class="verified-check">✓</span>';
    }
    return '';
}

// ============================================
// FUNCTION: Test bot connection
// ============================================
function testBot() {
    if (typeof BOT_TOKEN !== 'undefined') {
        alert("✅ Bot is connected!\n" +
              "Bot ID: " + BOT_ID + "\n" +
              "Token: " + BOT_TOKEN.substring(0, 10) + "...");
    } else {
        alert("❌ Bot not connected. Please check config.js");
    }
}

// ============================================
// LOGIN SYSTEM
// ============================================

// ===== Handle Login Form =====
function handleLogin(event) {
    event.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (!phone || phone.length < 10) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }

    if (!otp || otp.length !== 6) {
        alert('⚠️ Please enter a valid 6-digit OTP.');
        return;
    }

    console.log('📱 Phone:', phone);
    console.log('🔐 OTP:', otp);

    alert('✅ Login successful! Welcome to Destined!');
    window.location.href = 'home.html';
}

// ===== Login with Telegram =====
function loginWithTelegram() {
    alert('🔗 Redirecting to Telegram...');
}

// ============================================
// SIGNUP SYSTEM
// ============================================

let currentStep = 1;
const totalSteps = 5;

// ===== Next Step =====
function nextStep() {
    const currentStepElement = document.getElementById('step' + currentStep);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    let valid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            valid = false;
            input.style.borderColor = '#ff4444';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 3000);
        }
    });

    if (currentStep === 5) {
        const selected = document.querySelectorAll('.interest-item.selected').length;
        if (selected < 3) {
            valid = false;
            alert('⚠️ Please select at least 3 interests.');
        }
    }

    if (!valid) {
        return;
    }

    if (currentStep < totalSteps) {
        currentStepElement.classList.remove('active');
        currentStep++;
        document.getElementById('step' + currentStep).classList.add('active');
        updateProgressBar();
        updateInterestCount();
    }
}

// ===== Previous Step =====
function prevStep() {
    if (currentStep > 1) {
        document.getElementById('step' + currentStep).classList.remove('active');
        currentStep--;
        document.getElementById('step' + currentStep).classList.add('active');
        updateProgressBar();
        updateInterestCount();
    }
}

// ===== Update Progress Bar =====
function updateProgressBar() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'done');
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('done');
        }
    });
}

// ===== Update Interest Count =====
function updateInterestCount() {
    const selected = document.querySelectorAll('.interest-item.selected').length;
    const countElement = document.getElementById('interestCount');
    if (countElement) {
        countElement.textContent = selected;
    }
}

// ===== Toggle Interest Selection =====
function toggleInterest(element) {
    element.classList.toggle('selected');
    updateInterestCount();
}

// ===== Handle Signup =====
function handleSignup(event) {
    event.preventDefault();

    const selected = document.querySelectorAll('.interest-item.selected').length;
    if (selected < 3) {
        alert('⚠️ Please select at least 3 interests.');
        return;
    }

    const phone = document.getElementById('signupPhone');
    if (phone && phone.value.length < 10) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }

    const fullName = document.getElementById('fullName')?.value || '';
    const age = document.getElementById('age')?.value || '';
    const location = document.getElementById('location')?.value || '';
    const bio = document.getElementById('bio')?.value || '';

    console.log('📝 Signup Data:', { fullName, age, location, bio, phone: phone?.value, interests: selected });

    alert('🎉 Account created successfully! Welcome to Destined!');
    window.location.href = 'home.html';
}

// ===== Go to Login =====
function goToLogin() {
    window.location.href = 'login.html';
}

// ============================================
// HOME PAGE — SWIPE SYSTEM
// ============================================

const profiles = [
    {
        name: "Sarah",
        age: 28,
        location: "London",
        status: "Single",
        looking: "Long-term",
        bio: "Love is the greatest adventure. ❤️‍🔥",
        image: "https://picsum.photos/seed/1/400/500"
    },
    {
        name: "Marcus",
        age: 30,
        location: "Paris",
        status: "Single",
        looking: "Long-term",
        bio: "Adventure awaits! 🌍",
        image: "https://picsum.photos/seed/2/400/500"
    },
    {
        name: "Emma",
        age: 26,
        location: "Berlin",
        status: "Single",
        looking: "Short-term",
        bio: "Live life to the fullest! ✨",
        image: "https://picsum.photos/seed/3/400/500"
    },
    {
        name: "James",
        age: 32,
        location: "Rome",
        status: "Single",
        looking: "Long-term",
        bio: "Passion for life and love. 🍕",
        image: "https://picsum.photos/seed/4/400/500"
    },
    {
        name: "Mia",
        age: 25,
        location: "Barcelona",
        status: "Single",
        looking: "Both",
        bio: "Dancing through life. 💃",
        image: "https://picsum.photos/seed/5/400/500"
    }
];

let currentProfileIndex = 0;
let swipeHistory = [];

// ===== Load Profile =====
function loadProfile(index) {
    const profile = profiles[index];
    if (!profile) {
        document.getElementById('profileName').textContent = "No more profiles";
        document.getElementById('profileAge').textContent = "";
        document.getElementById('profileLocation').textContent = "Come back later!";
        document.getElementById('profileBio').textContent = "You've seen everyone!";
        document.getElementById('profileImage').src = "https://picsum.photos/seed/end/400/500";
        return;
    }

    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileAge').textContent = profile.age;
    document.getElementById('profileLocation').textContent = profile.location;
    document.getElementById('profileBio').textContent = profile.bio;
    document.getElementById('profileImage').src = profile.image;

    const statusBadge = document.querySelector('.badge-status');
    if (statusBadge) statusBadge.textContent = profile.status;

    const lookingBadge = document.querySelector('.badge-looking');
    if (lookingBadge) lookingBadge.textContent = '💍 Open to ' + profile.looking;
}

// ===== Like Swipe =====
function likeSwipe() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        swipeHistory.push({ profile, action: 'liked' });
        alert(`❤️ You liked ${profile.name}!`);
        nextProfile();
    }
}

// ===== Pass Swipe =====
function passSwipe() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        swipeHistory.push({ profile, action: 'passed' });
        nextProfile();
    }
}

// ===== Super Like =====
function superLike() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        alert(`⭐ You Super Liked ${profile.name}!`);
        nextProfile();
    }
}

// ===== Rewind =====
function rewindSwipe() {
    if (swipeHistory.length > 0) {
        const last = swipeHistory.pop();
        currentProfileIndex = profiles.indexOf(last.profile);
        loadProfile(currentProfileIndex);
        alert('↩️ Rewind successful!');
    } else {
        alert('⚠️ No profiles to rewind.');
    }
}

// ===== Boost =====
function boostProfile() {
    alert('⚡ Your profile is boosted for 30 minutes!');
}

// ===== Next Profile =====
function nextProfile() {
    currentProfileIndex++;
    if (currentProfileIndex >= profiles.length) {
        currentProfileIndex = 0;
    }
    loadProfile(currentProfileIndex);
}

// ============================================
// FUNCTION: Show notifications
// ============================================
function showNotification() {
    alert('🔔 You have 3 new notifications!');
}

// ============================================
// FUNCTION: Go to Profile
// ============================================
function goToProfile() {
    alert('👤 Profile page coming soon!');
}

console.log("✅ Destined script loaded successfully!");
