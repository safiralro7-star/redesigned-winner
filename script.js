let allApps = []; 

async function startSystem() {
    const response = await fetch('apps.json');
    allApps = await response.json();
    render(allApps);
}

function render(apps) {
    const grid = document.getElementById('app-grid');
    grid.innerHTML = apps.map(app => `
        <div class="app-card">
            <div class="badge ${app.status === 'VERIFIED' ? 'safe' : 'risk'}">${app.status}</div>
            <img src="${app.icon}">
            <h2>${app.name}</h2>
            <a href="${app.file}" class="download-btn" download>INITIALIZE_DL</a>
        </div>
    `).join('');
}

async function reportApp(appId) {
    if (confirm(`ARE_YOU_SURE? Reporting protocol ${appId} for malicious behavior.`)) {
        const response = await fetch('/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: appId })
        });
        if (response.ok) alert("THREAT_LOGGED: Administrators notified.");
    }
}

function filterApps() {
    const term = document.getElementById('app-search').value.toLowerCase();
    const filtered = allApps.filter(a => a.name.toLowerCase().includes(term));
    render(filtered);
}
function showHistory(appId) {
    const app = allApps.find(a => a.id === appId);
    const modal = document.getElementById('history-modal');
    document.getElementById('modal-title').innerText = `${app.name} CHANGELOG`;
    document.getElementById('modal-body').innerText = app.history || "Initial release - No changes recorded.";
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('history-modal').style.display = 'none';
}
async function submitApp() {
    const formData = new FormData();
    formData.append('name', document.getElementById('new-app-name').value);
    formData.append('version', '1.0');
    formData.append('description', 'User submitted protocol.');
    formData.append('appFile', document.getElementById('file-upload').files[0]);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        alert("UPLOAD_SUCCESS: Refreshing database...");
        location.reload();
    }
}
window.onload = startSystem;