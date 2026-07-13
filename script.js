// ============================================
// DESTINED — MAIN SCRIPT
// ============================================

console.log("❤️‍🔥 Destined — Connecting your fate...");

// ===== ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Destined loaded successfully!");

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
    // window.location.href = 'https://t.me/Destined110_Bot';
}

// ===== Show/Hide Password (OTP) =====
function toggleOTP() {
    const otpInput = document.getElementById('otp');
    otpInput.type = otpInput.type === 'password' ? 'text' : 'password';
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

    // Special check for Step 5 (Interests)
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

    // Check if at least 3 interests are selected
    const selected = document.querySelectorAll('.interest-item.selected').length;
    if (selected < 3) {
        alert('⚠️ Please select at least 3 interests.');
        return;
    }

    // Check phone number
    const phone = document.getElementById('signupPhone');
    if (phone && phone.value.length < 10) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }

    // Get all values
    const fullName = document.getElementById('fullName')?.value || '';
    const age = document.getElementById('age')?.value || '';
    const location = document.getElementById('location')?.value || '';
    const bio = document.getElementById('bio')?.value || '';

    console.log('📝 Signup Data:');
    console.log('📱 Phone:', phone?.value);
    console.log('👤 Name:', fullName);
    console.log('🎂 Age:', age);
    console.log('📍 Location:', location);
    console.log('📝 Bio:', bio);
    console.log('🏷️ Interests:', selected);

    alert('🎉 Account created successfully! Welcome to Destined!');
    window.location.href = 'home.html';
}

// ===== Go to Login =====
function goToLogin() {
    window.location.href = 'login.html';
}

// ============================================
// HOME PAGE (Coming Soon)
// ============================================

// ===== Logout =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('👋 Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// ============================================
// SCRIPT INITIALIZATION
// ============================================

console.log("✅ Destined script loaded successfully!");
