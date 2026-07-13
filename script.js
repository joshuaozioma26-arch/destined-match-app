// DESTINED — MAIN SCRIPT
console.log("❤️‍🔥 Destined — Connecting your fate...");

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

    // Auto-redirect to bot after 3 seconds (optional)
    // setTimeout(() => {
    //     window.location.href = "https://t.me/Destined110_Bot";
    // }, 3000);
});

// Simple function to test bot connection
function testBot() {
    if (typeof BOT_TOKEN !== 'undefined') {
        alert("✅ Bot is connected!\nToken: " + BOT_TOKEN.substring(0, 10) + "...");
    } else {
        alert("❌ Bot not connected. Please check config.js");
    }
}
