// ============================================
// DESTINED — COMPLETE WORKING APP
// ============================================

console.log("❤️ Destined — Loading...");

// ============================================
// SUPABASE CONFIGURATION
// ============================================

const supabaseUrl = 'https://kmhyvrhvhaqbzdyaalprk.supabase.co';
const supabaseKey = 'sb_publishable_3g3ybut4pJDS54DitwtzeA_3l3z6RRR';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ============================================
// PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
// GO TO REGISTRATION
// ============================================

function goToRegistration() {
    const welcomePage = document.getElementById('welcomePage');
    const registrationPage = document.getElementById('registrationPage');
    
    if (welcomePage) {
        welcomePage.style.opacity = '0';
        welcomePage.style.transition = 'opacity 0.8s ease';
        setTimeout(() => {
            welcomePage.classList.remove('active');
            welcomePage.style.display = 'none';
            if (registrationPage) registrationPage.classList.add('active');
        }, 800);
    }
}

// ============================================
// REGISTRATION
// ============================================

async function handleRegister(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!fullName || !email || !password) {
        alert('⚠️ Please fill in all fields.');
        return;
    }

    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
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

        console.log('✅ User registered:', { fullName, email });

        const registrationPage = document.getElementById('registrationPage');
        const finalLoading = document.getElementById('finalLoading');
        
        if (registrationPage) registrationPage.classList.remove('active');
        if (finalLoading) finalLoading.classList.add('active');

        setTimeout(() => {
            if (finalLoading) finalLoading.classList.remove('active');
            const mainApp = document.getElementById('mainApp');
            if (mainApp) mainApp.classList.add('active');
            loadProfile(0);
        }, 3500);

    } catch (error) {
        console.error('Registration Error:', error);
        alert('⚠️ Something went wrong. Please try again.');
    }
}

// ============================================
// SWIPE SYSTEM
// ============================================

const profiles = [
    { name: "Sarah", age: 28, location: "London", status: "Single", looking: "Long-term", bio: "Love is the greatest adventure.", image: "https://picsum.photos/seed/1/400/500" },
    { name: "Marcus", age: 30, location: "Paris", status: "Single", looking: "Long-term", bio: "Adventure awaits!", image: "https://picsum.photos/seed/2/400/500" },
    { name: "Emma", age: 26, location: "Berlin", status: "Single", looking: "Short-term", bio: "Live life to the fullest!", image: "https://picsum.photos/seed/3/400/500" },
    { name: "James", age: 32, location: "Rome", status: "Single", looking: "Long-term", bio: "Passion for life and love.", image: "https://picsum.photos/seed/4/400/500" },
    { name: "Mia", age: 25, location: "Barcelona", status: "Single", looking: "Both", bio: "Dancing through life.", image: "https://picsum.photos/seed/5/400/500" }
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

// ============================================
// COMING SOON
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
