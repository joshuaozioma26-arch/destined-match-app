// ============================================
// DESTINED — CONFIGURATION
// ⚠️ KEEP THIS FILE PRIVATE! DO NOT SHARE!
// ============================================

// ===== BOT CONFIGURATION =====
const BOT_TOKEN = "8592477719:AAENJPnXwizVOThJBeXGvJOESAOzYB6l3UI";
const BOT_ID = "7617842224";

// ===== TIERS CONFIGURATION =====
const TIERS = {
    FREE: { 
        name: "Free", 
        verified: false,
        emoji: "⬜",
        needsVerification: false
    },
    PREMIUM: { 
        name: "Premium", 
        verified: false,
        emoji: "⭐",
        needsVerification: false
    },
    VIP: { 
        name: "VIP", 
        verified: false,
        emoji: "🌟",
        needsVerification: true
    },
    ELITE: { 
        name: "Elite", 
        verified: false,
        emoji: "🔱",
        needsVerification: true
    }
};

// ===== VERIFICATION RULES =====
const VERIFICATION_RULES = {
    // VIP and ELITE need verification
    // Verification checks:
    checks: [
        "profile_complete",
        "photos_real",
        "account_active",
        "no_reports",
        "normal_behavior"
    ],
    // Try again after 30 days if failed
    retry_days: 30,
    // Verification badge
    badge: {
        color: "#0099ff",
        icon: "✓",
        style: "Telegram-style blue check"
    }
};

console.log("✅ Destined Bot Configuration Loaded");
console.log("🤖 Bot ID:", BOT_ID);
console.log("🔐 Token:", BOT_TOKEN.substring(0, 10) + "...");
console.log("👑 Tiers Loaded:", Object.keys(TIERS).length);
