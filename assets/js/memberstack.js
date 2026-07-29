// Memberstack integration for ZTOP Hugo site
(function() {
    function onMemberStackReady(member) {
        var authDiv = document.getElementById('memberstack-auth');
        var profileDiv = document.getElementById('memberstack-profile');
        
        if (member && member.id) {
            // Logged in
            if (authDiv) authDiv.style.display = 'none';
            if (profileDiv) {
                profileDiv.style.display = 'flex';
                var avatar = profileDiv.querySelector('.user-avatar');
                var nameEl = profileDiv.querySelector('.user-name');
                if (avatar && member.profileImage) {
                    avatar.innerHTML = '<img src="' + member.profileImage + '" alt="" />';
                } else if (avatar) {
                    avatar.textContent = member.name ? member.name.charAt(0).toUpperCase() : '?';
                    avatar.style.cssText = 'width:28px;height:28px;border-radius:50%;background:var(--accent);color:#000;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;';
                }
                if (nameEl) {
                    nameEl.textContent = member.name || member.email || 'Member';
                }
            }
        } else {
            if (authDiv) authDiv.style.display = 'flex';
            if (profileDiv) profileDiv.style.display = 'none';
        }
    }

    // Memberstack script tag sets window.MemberStack and calls .onReady when ready
    if (window.MemberStack) {
        MemberStack.onReady = onMemberStackReady;
    } else {
        // Poll until MemberStack is available
        var attempts = 0;
        var interval = setInterval(function() {
            if (window.MemberStack) {
                clearInterval(interval);
                MemberStack.onReady = onMemberStackReady;
            } else if (++attempts > 50) {
                clearInterval(interval);
            }
        }, 100);
    }
})();
