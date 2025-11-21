// Navigation
const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.view');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // Update buttons
        navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update views
        views.forEach(v => v.classList.remove('active'));
        document.getElementById(`${tab}-view`).classList.add('active');
    });
});

// API Client
async function fetchData(endpoint) {
    try {
        const res = await fetch(`/api/google/${endpoint}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`Error fetching ${endpoint}:`, e);
        return null;
    }
}

// Render Functions
function renderFileItem(file) {
    return `
        <a href="${file.webViewLink}" target="_blank" class="list-item">
            <div class="item-icon">📄</div>
            <div class="item-details">
                <div class="item-title">${file.name}</div>
                <div class="item-subtitle">Google Drive</div>
            </div>
        </a>
    `;
}

function renderMessageItem(msg) {
    const subject = msg.payload.headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
    const from = msg.payload.headers.find(h => h.name === 'From')?.value || 'Unknown';

    return `
        <a href="https://mail.google.com/mail/u/0/#inbox/${msg.id}" target="_blank" class="list-item">
            <div class="item-icon">✉️</div>
            <div class="item-details">
                <div class="item-title">${subject}</div>
                <div class="item-subtitle">${from}</div>
            </div>
        </a>
    `;
}

// Load Data
async function loadDrive() {
    const container = document.getElementById('drive-list');
    container.innerHTML = '<div class="loading-spinner"></div>';

    const data = await fetchData('drive');
    if (data && data.length) {
        container.innerHTML = data.map(renderFileItem).join('');
        // Also update dashboard
        document.getElementById('dashboard-files').innerHTML = data.slice(0, 5).map(renderFileItem).join('');
    } else {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#888">No files found</div>';
        document.getElementById('dashboard-files').innerHTML = '<div style="text-align:center; padding:20px; color:#888">No files found</div>';
    }
}

async function loadGmail() {
    const container = document.getElementById('gmail-list');
    container.innerHTML = '<div class="loading-spinner"></div>';

    const data = await fetchData('gmail');
    if (data && data.length) {
        container.innerHTML = data.map(renderMessageItem).join('');
        // Also update dashboard
        document.getElementById('dashboard-messages').innerHTML = data.slice(0, 5).map(renderMessageItem).join('');
    } else {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#888">No messages found</div>';
        document.getElementById('dashboard-messages').innerHTML = '<div style="text-align:center; padding:20px; color:#888">No messages found</div>';
    }
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadDrive();
    loadGmail();
});
