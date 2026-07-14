// ============================================
// DESTINED — MAIN SCRIPT (WITH SUPABASE)
// ============================================

console.log("❤️ Destined — Loading...");

// ============================================
// SUPABASE CLIENT
// ============================================

const supabaseUrl = 'https://kmhyvrhvhaqbzdyaalprk.supabase.co';
const supabaseKey = 'sb_publishable_3g3ybut4pJDS54DitwtzeA_3l3z6RRR';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ============================================
// VERIFICATION STATE (PERSISTENT)
// ============================================

let verificationState = {
    phone: '',
    otpSent: false,
    otpVerified: false,
    faceVerified: false,
    otpCode: ''
};

// ============================================
// PAGE LOAD — RESTORE STATE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Restore verification state from localStorage
    const saved = localStorage.getItem('destined_verification');
    if (saved) {
        verificationState = JSON.parse(saved);
        restoreUI();
    }

    // First loading → Welcome
    setTimeout(function() {
        const firstLoading = document.getElementById('firstLoading');
        if (firstLoading) {
            firstLoading.style.display = 'none';
            const welcomePage = document.getElementById('welcomePage');
            if (welcomePage) welcomePage.classList.add('active');
        }
    }, 3500);
});

// ============================================
// RESTORE UI BASED ON STATE
// ============================================

function restoreUI() {
    const phoneStep = document.getElementById('stepPhone');
    const otpStep = document.getElementById('stepOTP');
    const faceStep = document.getElementById('stepFace');

    if (verificationState.otpSent && !verificationState.otpVerified) {
        if (phoneStep) phoneStep.style.display = 'none';
        if (otpStep) otpStep.style.display = 'block';
        const phoneInput = document.getElementById('verifyPhone');
        if (phoneInput) phoneInput.value = verificationState.phone;
    }

    if (verificationState.otpVerified && !verificationState.faceVerified) {
        if (phoneStep) phoneStep.style.display = 'none';
        if (otpStep) otpStep.style.display = 'none';
        if (faceStep) faceStep.style.display = 'block';
    }

    if (verificationState.faceVerified) {
        const verificationPage = document.getElementById('verificationPage');
        const registrationPage = document.getElementById('registrationPage');
        if (verificationPage) verificationPage.classList.remove('active');
        if (registrationPage) registrationPage.classList.add('active');
    }
}

// ============================================
// SAVE STATE
// ============================================

function saveState() {
    localStorage.setItem('destined_verification', JSON.stringify(verificationState));
}

// ============================================
// GO TO VERIFICATION
// ============================================

function goToVerification() {
    const welcomePage = document.getElementById('welcomePage');
    const verificationPage = document.getElementById('verificationPage');
    
    if (welcomePage) {
        welcomePage.style.opacity = '0';
        welcomePage.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            welcomePage.classList.remove('active');
            welcomePage.style.display = 'none';
            if (verificationPage) verificationPage.classList.add('active');
        }, 800);
    }
}

// ============================================
// SEND OTP (WITH SUPABASE)
// ============================================

async function sendOTP() {
    const phoneInput = document.getElementById('verifyPhone');
    const phone = phoneInput?.value || '';

    if (!phone || phone.length < 10) {
        alert('⚠️ Please enter a valid phone number.');
        return;
    }

    verificationState.phone = phone;
    verificationState.otpSent = true;
    saveState();

    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone: phone,
        });

        if (error) {
            console.error('OTP Error:', error);
            alert('⚠️ Failed to send OTP. Please try again.');
            return;
        }

        alert('📱 OTP sent to your phone via Telegram!');
        
        const phoneStep = document.getElementById('stepPhone');
        const otpStep = document.getElementById('stepOTP');
        if (phoneStep) phoneStep.style.display = 'none';
        if (otpStep) otpStep.style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Something went wrong. Please try again.');
    }
}

// ============================================
// VERIFY OTP
// ============================================

async function verifyOTP() {
    const otpInput = document.getElementById('otpCode');
    const otp = otpInput?.value || '';

    if (!otp || otp.length !== 6) {
        alert('⚠️ Please enter a valid 6-digit OTP.');
        return;
    }

    verificationState.otpCode = otp;
    verificationState.otpVerified = true;
    saveState();

    try {
        const { data, error } = await supabase.auth.verifyOtp({
            phone: verificationState.phone,
            token: otp,
            type: 'sms'
        });

        if (error) {
            console.error('Verification Error:', error);
            alert('⚠️ Invalid OTP. Please try again.');
            verificationState.otpVerified = false;
            saveState();
            return;
        }

        alert('✅ Phone verified successfully!');
        
        const otpStep = document.getElementById('stepOTP');
        const faceStep = document.getElementById('stepFace');
        if (otpStep) otpStep.style.display = 'none';
        if (faceStep) faceStep.style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Something went wrong. Please try again.');
    }
}

// ============================================
// RESEND OTP
// ============================================

async function resendOTP() {
    if (!verificationState.phone) {
        alert('⚠️ Please enter your phone number first.');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            phone: verificationState.phone,
        });

        if (error) {
            console.error('Resend Error:', error);
            alert('⚠️ Failed to resend OTP.');
            return;
        }

        alert('📱 New OTP sent to your phone!');

    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Something went wrong.');
    }
}

// ============================================
// FACE VERIFICATION
// ============================================

function takeSelfie() {
    const camera = document.querySelector('.face-camera');
    if (camera) {
        camera.innerHTML = '<span>✅</span><p>Selfie captured!</p>';
        document.querySelector('.face-verification .btn-verify').style.display = 'none';
        document.querySelector('.pose-verification').style.display = 'block';
    }
}

function verifyFace() {
    verificationState.faceVerified = true;
    saveState();
    alert('✅ Face verified!');

    setTimeout(() => {
        const verificationPage = document.getElementById('verificationPage');
        const registrationPage = document.getElementById('registrationPage');
        if (verificationPage) verificationPage.classList.remove('active');
        if (registrationPage) registrationPage.classList.add('active');
    }, 500);
}

function completeVerification() {
    verifyFace();
}

// ============================================
// REGISTRATION (SAVE TO SUPABASE)
// ============================================

async function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const password = document.getElementById('password')?.value || '';

    if (!fullName || !email || !password) {
        alert('⚠️ Please fill in all fields.');
        return;
    }

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            phone: verificationState.phone,
        });

        if (authError) {
            console.error('Auth Error:', authError);
            alert('⚠️ Failed to create account: ' + authError.message);
            return;
        }

        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert([
                {
                    id: authData.user?.id,
                    full_name: fullName,
                    email: email,
                    phone: verificationState.phone,
                    verified: true,
                    tier: 'FREE',
                    created_at: new Date().toISOString()
                }
            ]);

        if (profileError) {
            console.error('Profile Error:', profileError);
            alert('⚠️ Failed to save profile.');
            return;
        }

        console.log('✅ User registered:', { fullName, email, phone: verificationState.phone });

        const registrationPage = document.getElementById('registrationPage');
        const finalLoading = document.getElementById('finalLoading');
        
        if (registrationPage) registrationPage.classList.remove('active');
        if (finalLoading) finalLoading.classList.add('active');

        setTimeout(() => {
            if (finalLoading) finalLoading.classList.remove('active');
            const mainApp = document.getElementById('mainApp');
            if (mainApp) mainApp.classList.add('active');
        }, 3500);

    } catch (error) {
        console.error('Registration Error:', error);
        alert('⚠️ Something went wrong. Please try again.');
    }
}

// ============================================
// GO TO LOGIN
// ============================================

function goToLogin() {
    alert('🔐 Login page coming soon!');
}

// ============================================
// COMING SOON MODAL
// ============================================

function showComingSoon(featureName) {
    const modal = document.getElementById('comingSoonModal');
    const feature = document.getElementById('featureName');
    if (feature) feature.textContent = featureName || 'Premium Features';
    if (modal) modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('comingSoonModal').style.display = 'none';
}

function setReminder() {
    localStorage.setItem('destined_reminder', 'true');
    localStorage.setItem('destined_reminder_date', Date.now());
    alert('✅ We\'ll remind you when payments are ready!');
    closeModal();
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
    const mainApp = document.getElementById('mainApp');
    if (mainApp && mainApp.classList.contains('active')) {
        loadProfile(currentProfileIndex);
    }
});

// Also load when main app becomes active
const observer = new MutationObserver(function() {
    const mainApp = document.getElementById('mainApp');
    if (mainApp && mainApp.classList.contains('active') && document.getElementById('profileName')) {
        loadProfile(currentProfileIndex);
    }
});
observer.observe(document.getElementById('mainApp'), { attributes: true, attributeFilter: ['class'] });
