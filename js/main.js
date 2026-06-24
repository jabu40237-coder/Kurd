import { auth } from './firebase.js';
import { showToast, renderStaticPage } from './ui.js';
import { renderStore } from './store.js';
import { renderUserDashboard } from './user.js';

const appContainer = document.getElementById('app-container');
const loader = document.getElementById('app-loader');

function navigate(route) {
    if (route === 'store') renderStore();
    else if (route === 'account') renderUserDashboard();
    else if (['faq', 'privacy', 'terms', 'contact'].includes(route)) renderStaticPage(route);
    else renderHome();
    window.scrollTo(0, 0);
}

function renderHome() {
    document.getElementById('main-content').innerHTML = `
        <div class="section" style="text-align:center; margin-top:4rem;">
            <h1 style="font-size:3rem; color:var(--accent-lime);">منصة Lokxse</h1>
            <p style="font-size:1.2rem; color:var(--text-secondary);">الجيل القادم من الخدمات الرقمية والمتجر المتكامل.</p>
            <button class="btn-nav" data-route="store" style="margin-top:2rem;">تصفح المتجر</button>
        </div>
    `;
}

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        appContainer.classList.remove('hidden');
        navigate('home');
    }, 1000);

    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-route]');
        if (target) navigate(target.dataset.route);
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            document.getElementById('loginBtn').classList.add('hidden');
            document.getElementById('userAccountBtn').classList.add('active');
            document.getElementById('userNameDisplay').innerText = user.email.split('@')[0];
        } else {
            document.getElementById('loginBtn').classList.remove('hidden');
            document.getElementById('userAccountBtn').classList.add('hidden');
        }
    });

    document.getElementById('userAccountBtn').addEventListener('click', () => navigate('account'));
    document.getElementById('loginBtn').addEventListener('click', () => showToast('تنبيه', 'نظام الدخول سيظهر هنا'));
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
});
