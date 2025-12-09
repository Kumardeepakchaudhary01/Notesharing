// Core Logic
let currentDept = null;

document.addEventListener('DOMContentLoaded', () => {
    initDepartments();
    initSemesters();
    setupEventListeners();
});

// Initialize Departments Grid
function initDepartments() {
    const grid = document.getElementById('dept-grid');
    if (!grid) return;

    grid.innerHTML = '';
    db.departments.forEach(dept => {
        const card = document.createElement('div');
        card.className = 'glass-card dept-card';
        card.innerHTML = `
            <i class="fa-solid ${dept.icon}"></i>
            <h3>${dept.name}</h3>
            <p>${dept.info}</p>
            <span style="font-size: 0.8rem; color: var(--primary); margin-top: 10px; display: inline-block;">
                ${db.subjects[dept.id] ? db.subjects[dept.id].length : 0} Subjects
            </span>
        `;
        card.addEventListener('click', () => openExplorer(dept));
        grid.appendChild(card);
    });
}

// Initialize Semesters Dropdown
function initSemesters() {
    const select = document.getElementById('semester-select');
    if (!select) return;

    db.semesters.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem.id;
        option.textContent = sem.name;
        select.appendChild(option);
    });
}

// Navigation Logic
function openExplorer(dept) {
    currentDept = dept;
    // Hide Home & Depts, Show Explorer
    document.getElementById('home').style.display = 'none';
    document.getElementById('departments').style.display = 'none';

    const explorer = document.getElementById('notes-explorer');
    explorer.style.display = 'block';

    // Update Title
    document.getElementById('selected-dept-title').innerHTML = `${dept.name} <span class="text-gradient">Subjects</span>`;

    // Render Subjects
    renderSubjects(dept.id);

    // Scroll to top
    window.scrollTo(0, 0);
}

function closeExplorer() {
    currentDept = null;
    document.getElementById('home').style.display = 'flex'; // Hero is flex
    document.getElementById('departments').style.display = 'block';
    document.getElementById('notes-explorer').style.display = 'none';
}

function renderSubjects(deptId, filterSem = 'all', filterText = '') {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = '';

    const subjects = db.subjects[deptId] || [];

    const filtered = subjects.filter(sub => {
        // Mock sem logic: randomly assign sem for demo if not in data, or assume all show
        // Real app would have 'semester' property in subject
        const matchesText = sub.name.toLowerCase().includes(filterText.toLowerCase()) ||
            sub.code.toLowerCase().includes(filterText.toLowerCase());
        return matchesText;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; text-align: center;">No subjects found.</p>';
        return;
    }

    filtered.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <h3 style="font-size: 1.2rem;">${sub.name}</h3>
                <span class="badge-glass" style="font-size: 0.7rem; padding: 4px 8px;">${sub.code}</span>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 20px;">${sub.units} Units Available</p>
            <button class="search-btn" style="width: 100%; padding: 10px; font-size: 0.9rem;">View Notes</button>
        `;
        card.querySelector('button').addEventListener('click', () => openPDFModal(sub));
        grid.appendChild(card);
    });
}

// Event Listeners
function setupEventListeners() {
    // Back Button
    const backBtn = document.getElementById('back-to-dept');
    if (backBtn) backBtn.addEventListener('click', closeExplorer);

    // Filters
    const subSearch = document.getElementById('subject-search');
    if (subSearch) subSearch.addEventListener('input', (e) => {
        if (currentDept) renderSubjects(currentDept.id, 'all', e.target.value);
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        themeBtn.innerHTML = next === 'dark' ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    });

    // Modal Close
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => {
        document.getElementById('pdf-modal').classList.remove('active');
    });
}

// PDF Modal
function openPDFModal(subject) {
    const modal = document.getElementById('pdf-modal');
    modal.classList.add('active');
    document.getElementById('modal-title').innerText = `${subject.code}: ${subject.name}`;

    // In a real app, we would load the viewer here.
    // For now, it stays as placeholder.
}
