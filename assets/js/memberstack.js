// Memberstack integration for Hugo
// Replace YOUR_MEMBERSTACK_ID with your actual Memberstack ID

document.addEventListener('DOMContentLoaded', function() {
    // Listen for Memberstack auth state changes
    window.MemberStack = window.MemberStack || {};
    
    MemberStack.onReady = function(member) {
        const authDiv = document.getElementById('memberstack-auth');
        const profileDiv = document.getElementById('memberstack-profile');
        
        if (member && member.id) {
            // Logged in
            if (authDiv) authDiv.style.display = 'none';
            if (profileDiv) {
                profileDiv.style.display = 'flex';
                const avatar = profileDiv.querySelector('.user-avatar');
                const name = profileDiv.querySelector('.user-name');
                if (avatar && member.profileImage) {
                    avatar.innerHTML = '<img src="' + member.profileImage + '" alt="">';
                }
                if (name) {
                    name.textContent = member.name || member.email || 'Member';
                }
            }
            
            // Check content gating
            checkContentAccess(member);
        } else {
            // Not logged in
            if (authDiv) authDiv.style.display = 'flex';
            if (profileDiv) profileDiv.style.display = 'none';
            checkContentAccess(null);
        }
    };
    
    function checkContentAccess(member) {
        const gatedContent = document.querySelectorAll('[data-ms-content]');
        gatedContent.forEach(el => {
            const requiredPlan = el.getAttribute('data-ms-content');
            if (!member) {
                el.innerHTML = '<div class="gate-wall"><p>🔒 This content requires membership</p><button onclick="MemberStack.showSignup()">Sign Up to View</button></div>';
            }
            // Memberstack handles plan-based gating automatically via its own DOM scanning
        });
    }
});
