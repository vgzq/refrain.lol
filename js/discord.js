let lanyardDataCache = null;

async function fetchLanyardData() {
    const response = await fetch(`https://api.lanyard.rest/v1/users/984330364606636044`);
    const data = await response.json();
    if (data.success) {
        lanyardDataCache = data.data;
    }
}

function updateProfilePicture(discord_user) {
    const profilePictureElement = document.getElementById('pfp');
    const newProfilePictureSrc = `https://cdn.discordapp.com/avatars/984330364606636044/${discord_user.avatar}.png`;
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
        ogImage.setAttribute('content', newProfilePictureSrc);
    } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', newProfilePictureSrc);
        document.head.appendChild(meta);
    }

    if (profilePictureElement && profilePictureElement.src !== newProfilePictureSrc) {
        profilePictureElement.src = newProfilePictureSrc;
    }
}

function getTime() {
    const phoenixTime = new Date().toLocaleTimeString("en-US", { timeZone: "America/Phoenix" });
    return phoenixTime;
}

function updateStatusDot(discord_status) {
    const statusDot = document.getElementById('status-dot');
    if (statusDot) {
        let statusText = 'Status';
        switch (discord_status) {
            case "online":
                statusDot.style.backgroundColor = "#22C55E";
                statusText = 'Online';
                break;
            case "idle":
                statusDot.style.backgroundColor = "#FACC15";
                statusText = 'Idle';
                break;
            case "dnd":
                statusDot.style.backgroundColor = "#EF4444";
                statusText = 'Do Not Disturb';
                break;
            default:
                statusDot.style.backgroundColor = "#6B7280";
                statusText = 'Offline';
        }
        statusDot.setAttribute('title', `${getTime()}`);
    }
}

async function updateUI() {
    await fetchLanyardData();

    const lanyardData = lanyardDataCache;
    if (!lanyardData) return;

    const { discord_user, discord_status } = lanyardData;

    updateProfilePicture(discord_user);
    updateStatusDot(discord_status);
}

document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateUI, 1000);
    updateUI();
});
