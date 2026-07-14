// ============================================
// DESTINED — CONFIGURATION
// KEYS ARE IN .env FILE (LOCAL ONLY)
// ⚠️ KEEP .env PRIVATE! DO NOT SHARE!
// ============================================

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
    checks: [
        "profile_complete",
        "photos_real",
        "account_active",
        "no_reports",
        "normal_behavior"
    ],
    retry_days: 30,
    badge: {
        color: "#0099ff",
        icon: "✓",
        style: "Telegram-style blue check"
    }
};

// ===== DIAMOND PRICING =====
const DIAMOND_PRICING = {
    "500": 4.99,
    "1200": 9.99,
    "3000": 19.99,
    "7000": 39.99,
    "15000": 79.99,
    "35000": 149.99,
    "75000": 299.99,
    "150000": 549.99,
    "350000": 1199.99,
    "750000": 2499.99,
    "1000000": 3299.99
};

// ===== WITHDRAWAL RULES =====
const WITHDRAWAL_RULES = {
    min: 30000,
    max: 300000,
    fee: 15,
    cooldown: "2 days 6 hours",
    methods: ["PayPal"],
    processing: "24-48 hours"
};

// ===== SWIPE LIMITS =====
const SWIPE_LIMITS = {
    FREE: { swipes: 30, likes: 15, superLikes: 1, rewinds: 3 },
    PREMIUM: { swipes: 80, likes: 40, superLikes: 3, rewinds: 5 },
    VIP: { swipes: 150, likes: 75, superLikes: 5, rewinds: 10 },
    ELITE: { swipes: Infinity, likes: Infinity, superLikes: 10, rewinds: Infinity }
};

// ===== CARD PRICING =====
const CARD_PRICING = {
    GOLD: { price: 900, diamonds: 100000, discount: 10, badge: "Gold" },
    BLACK: { price: 8500, diamonds: 1000000, discount: 15, badge: "Black" }
};

// ===== TIER PRICING (Monthly) =====
const TIER_PRICING = {
    PREMIUM: 4.99,
    VIP: 9.99,
    ELITE: 24.99
};

console.log("✅ Destined Configuration Loaded");
console.log("🔑 Keys are stored in .env (local only)");
console.log("👑 Tiers Loaded:", Object.keys(TIERS).length);
console.log("💎 Diamond Pricing:", Object.keys(DIAMOND_PRICING).length, "tiers");
console.log("💳 Cards:", Object.keys(CARD_PRICING).length);
console.log("📊 Swipe Limits:", Object.keys(SWIPE_LIMITS).length, "tiers");
