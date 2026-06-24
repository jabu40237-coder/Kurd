import { auth, db } from './firebase.js';
import { showToast, renderStaticPage, renderAuthModal } from './ui.js';
import { renderStore } from './store.js';
import { renderUserDashboard } from './user.js';

const appContainer = document.getElementById('app-container');
const loader = document.getElementById('app-loader');

async function renderHome() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section" style="text-align:center; margin-top:4rem;">
            <h1 style="font-size:3rem; color:var(--accent-lime);">منصة Lokxse</h1>
            <p style="font-size:1.2rem; color:var(--text-secondary);">الجيل القادم من الخدمات الرقمية والمتجر المتكامل.</p>
        </div>
        <div class="section">
            <h2>الخدمات المتاحة</h2>
            <div class="grid" id="servicesGrid" style="margin-top:2rem;">
                <div class="card"><p>جاري تحميل الخدمات...</p></div>
            </div>
        </div>
    `;

    // جلب الخدمات من قاعدة البيانات
    try {
        const snapshot = await db.collection('services').get();
        const grid = document.getElementById('servicesGrid');
        grid.innerHTML = '';
        if (snapshot.empty) {
            grid.innerHTML = '<p>لا توجد خدمات مضافة حالياً. (سجل دخول كمدير لإضافة خدمات)</p>';
        } else {
            snapshot.forEach(doc => {
                const s = doc.data();
                grid.innerHTML += `
                    <div class="card">
                        <div style="height:120px; background:url('${s.image || ''}'); background-size:cover; border-radius:8px;"></div>
                        <h3 style="margin:1rem 0;">${s.title}</h3>
                        <p style="color:var(--accent-lime); font-weight:bold;">${s.price}</p>
                    </div>
                `;
            });
        }
    } catch (e) {
        console.error(e);
    }
}

function navigate(route) {
    if (route === 'store') renderStore();
    else if (route === 'account') renderUserDashboard();
    else if (['faq', 'privacy', 'terms', 'contact'].includes(route)) renderStaticPage(route);
    else renderHome();
    window.scrollTo(0, 0);
}

function openAuthModal() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = renderAuthModal();
    document.body.appendChild(modalContainer.firstElementChild);

    document.getElementById('closeAuthModal').addEventListener('click', () => {
        document.getElementById('authModal').remove();
    });

    document.getElementById('loginTab').addEventListener('click', () => {
        document.getElementById('loginForm').classList.remove('hidden');
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('loginTab').style.background = 'var(--accent-lime)';
        document.getElementById('loginTab').style.color = '#000';
        document.getElementById('registerTab').style.background = 'none';
        document.getElementById('registerTab').style.color = '#8b8b95';
    });

    document.getElementById('registerTab').addEventListener('click', () => {
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('registerTab').style.background = 'var(--accent-lime)';
        document.getElementById('registerTab').style.color = '#000';
        document.getElementById('loginTab').style.background = 'none';
        document.getElementById('loginTab').style.color = '#8b8b95';
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        auth.signInWithEmailAndPassword(email, pass).then(() => {
            document.getElementById('authModal').remove();
            showToast('مرحباً', 'تم تسجيل الدخول بنجاح');
        }).catch(err => showToast('خطأ', err.message));
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPassword').value;
        auth.createUserWithEmailAndPassword(email, pass).then(async (userCred) => {
            await db.collection('users').doc(email).set({ balance: 0, photoURL: '' });
            document.getElementById('authModal').remove();
            showToast('تم', 'تم إنشاء حسابك بنجاح! رصيدك 0$');
        }).catch(err => showToast('خطأ', err.message));
    });
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
    document.getElementById('loginBtn').addEventListener('click', openAuthModal);
    
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
});
