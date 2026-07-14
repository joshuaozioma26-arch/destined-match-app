// ============================================
// DESTINED — SCRIPT
// ============================================

console.log("❤️ Destined — Loading...");

// ===== FIRST LOADING → WELCOME =====
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const firstLoading = document.getElementById('firstLoading');
        firstLoading.style.display = 'none';
        
        const welcomePage = document.getElementById('welcomePage');
        welcomePage.classList.add('active');
        
    }, 3500);
});

// ===== GO TO VERIFICATION =====
function goToVerification() {
    const welcomePage = document.getElementById('welcomePage');
    const verificationPage = document.getElementById('verificationPage');
    
    welcomePage.style.opacity = '0';
    welcomePage.style.transition = 'opacity 0.8s ease';
    
    setTimeout(function() {
        welcomePage.classList.remove('active');
        welcomePage.style.display = 'none';
        verificationPage.classList.add('active');
    }, 800);
}

// ===== SECURITY VERIFICATION =====
let otpVerified = false;
let faceVerified = false;

function sendOTP() {
    const phone = document.getElementById('verifyPhone').value;
    if (!phone || phone.length < 10) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }
    alert('📱 OTP sent to ' + phone);
    document.querySelector('.otp-group').style.display = 'block';
    document.querySelector('#stepPhone .btn-verify').style.display = 'none';
}

function verifyOTP() {
    const otp = document.getElementById('otpCode').value;
    if (!otp || otp.length !== 6) {
        alert('⚠️ Please enter a valid 6-digit OTP.');
        return;
    }
    otpVerified = true;
    alert('✅ Phone verified!');
    document.getElementById('stepPhone').style.display = 'none';
    document.getElementById('stepFace').style.display = 'block';
}

function verifyFace() {
    alert('📸 Please take a selfie');
    document.querySelector('.face-camera').innerHTML = '<span>✅</span><p>Selfie captured!</p>';
    document.querySelector('.face-verification .btn-verify').style.display = 'none';
    document.querySelector('.pose-verification').style.display = 'block';
}

function completeVerification() {
    faceVerified = true;
    alert('✅ Face verified!');
    
    setTimeout(function() {
        const verificationPage = document.getElementById('verificationPage');
        verificationPage.classList.remove('active');
        
        const registrationPage = document.getElementById('registrationPage');
        registrationPage.classList.add('active');
    }, 500);
}

// ===== GO TO LOGIN =====
function goToLogin() {
    alert('🔐 Login page coming soon!');
}

// ===== HANDLE REGISTRATION =====
function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!fullName || !email || !password) {
        alert('⚠️ Please fill in all fields.');
        return;
    }
    
    console.log('📝 Registration:', { fullName, email });
    
    const registrationPage = document.getElementById('registrationPage');
    registrationPage.classList.remove('active');
    
    const finalLoading = document.getElementById('finalLoading');
    finalLoading.classList.add('active');
    
    setTimeout(function() {
        finalLoading.classList.remove('active');
        
        const mainApp = document.getElementById('mainApp');
        mainApp.classList.add('active');
        
    }, 3500);
}

// ============================================
// SWIPE SYSTEM (Home Page Functions)
// ============================================

const profiles = [
    { name: "Sarah", age: 28, location: "London", status: "Single", looking: "Long-term", bio: "Love is the greatest adventure. ❤️", image: "https://picsum.photos/seed/1/400/500" },
    { name: "Marcus", age: 30, location: "Paris", status: "Single", looking: "Long-term", bio: "Adventure awaits! 🌍", image: "https://picsum.photos/seed/2/400/500" },
    { name: "Emma", age: 26, location: "Berlin", status: "Single", looking: "Short-term", bio: "Live life to the fullest! ✨", image: "https://picsum.photos/seed/3/400/500" },
    { name: "James", age: 32, location: "Rome", status: "Single", looking: "Long-term", bio: "Passion for life and love. 🍕", image: "https://picsum.photos/seed/4/400/500" },
    { name: "Mia", age: 25, location: "Barcelona", status: "Single", looking: "Both", bio: "Dancing through life. 💃", image: "https://picsum.photos/seed/5/400/500" }
];

let currentProfileIndex = 0;
let swipeHistory = [];

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

function likeSwipe() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        swipeHistory.push({ profile, action: 'liked' });
        alert(`❤️ You liked ${profile.name}!`);
        nextProfile();
    }
}

function passSwipe() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        swipeHistory.push({ profile, action: 'passed' });
        nextProfile();
    }
}

function superLike() {
    const profile = profiles[currentProfileIndex];
    if (profile) {
        alert(`⭐ You Super Liked ${profile.name}!`);
        nextProfile();
    }
}

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

function boostProfile() {
    alert('⚡ Your profile is boosted for 30 minutes!');
}

function nextProfile() {
    currentProfileIndex++;
    if (currentProfileIndex >= profiles.length) {
        currentProfileIndex = 0;
    }
    loadProfile(currentProfileIndex);
}

// Load first profile when main app appears
document.addEventListener('DOMContentLoaded', function() {
    // Check if main app is active and load profile
    const mainApp = document.getElementById('mainApp');
    if (mainApp.classList.contains('active')) {
        loadProfile(currentProfileIndex);
    }
});

// Also load when main app becomes active
const observer = new MutationObserver(function() {
    const mainApp = document.getElementById('mainApp');
    if (mainApp.classList.contains('active') && document.getElementById('profileName')) {
        loadProfile(currentProfileIndex);
    }
});
observer.observe(document.getElementById('mainApp'), { attributes: true, attributeFilter: ['class'] });
