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

// ===== FUNCTION: Check if user can be verified =====
function canBeVerified(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key].needsVerification;
    }
    return false;
}

// ===== FUNCTION: Check if user is verified =====
function isVerified(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key].verified;
    }
    return false;
}

// ===== FUNCTION: Get tier details =====
function getTierDetails(tier) {
    const key = tier.toUpperCase();
    if (TIERS[key]) {
        return TIERS[key];
    }
    return TIERS.FREE;
}

// ===== FUNCTION: Start verification =====
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

// ===== FUNCTION: Complete verification =====
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

// ===== FUNCTION: Get verified badge HTML =====
function getVerifiedBadge(tier) {
    if (isVerified(tier)) {
        return '<span class="verified-check">✓</span>';
    }
    return '';
}

// ===== FUNCTION: Test bot connection =====
function testBot() {
    if (typeof BOT_TOKEN !== 'undefined') {
        alert("✅ Bot is connected!\n" +
              "Bot ID: " + BOT_ID + "\n" +
              "Token: " + BOT_TOKEN.substring(0, 10) + "...");
    } else {
        alert("❌ Bot not connected. Please check config.js");
    }
}

console.log("✅ Destined script loaded successfully!");
