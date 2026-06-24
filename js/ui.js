export function showToast(title, msg) {
    document.getElementById('toastTitle').innerText = title;
    document.getElementById('toastMsg').innerText = msg;
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

export function renderStaticPage(page) {
    const main = document.getElementById('main-content');
    const pages = {
        faq: `<div class="section"><h1>الأسئلة الشائعة</h1><div class="card" style="margin-top:1rem;"><h3>كيف أطلب خدمة؟</h3><p>اختر الخدمة، أدخل الرابط، وادفع عبر بايننس.</p></div></div>`,
        privacy: `<div class="section"><h1>سياسة الخصوصية</h1><p>نحن نحمي بياناتك ولا نشاركها مع أي طرف ثالث.</p></div>`,
        terms: `<div class="section"><h1>الشروط والأحكام</h1><p>يُمنع استخدام خدماتنا لأغراض غير قانونية.</p></div>`,
        contact: `<div class="section"><h1>تواصل معنا</h1><p>تيليجرام: @Lokxsee</p></div>`
    };
    main.innerHTML = pages[page] || `<div class="section"><h1>404</h1><p>الصفحة غير موجودة</p></div>`;
}

export function renderAuthModal() {
    return `
        <div class="modal-overlay active" id="authModal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:2000;">
            <div class="modal-content" style="background:#0a0a0f; border:1px solid var(--border-glass); border-radius:24px; padding:2rem; width:90%; max-width:400px; position:relative;">
                <button id="closeAuthModal" style="position:absolute; top:15px; left:15px; background:none; border:none; color:#fff; font-size:1.2rem; cursor:pointer;"><i class="fas fa-times"></i></button>
                <div style="display:flex; gap:5px; background:rgba(255,255,255,0.05); padding:5px; border-radius:10px; margin-bottom:1.5rem;">
                    <button class="tab-btn active" style="flex:1; border:none; background:var(--accent-lime); color:#000; border-radius:8px; padding:0.8rem; font-weight:bold; cursor:pointer;" id="loginTab">دخول</button>
                    <button class="tab-btn" style="flex:1; border:none; background:none; color:#8b8b95; border-radius:8px; padding:0.8rem; font-weight:bold; cursor:pointer;" id="registerTab">حساب جديد</button>
                </div>
                <form id="loginForm">
                    <input type="email" id="loginEmail" class="input" placeholder="البريد الإلكتروني" required>
                    <input type="password" id="loginPassword" class="input" placeholder="كلمة المرور" required>
                    <button type="submit" class="btn-primary">دخول إلى Lokxse</button>
                </form>
                <form id="registerForm" class="hidden">
                    <input type="email" id="regEmail" class="input" placeholder="البريد الإلكتروني" required>
                    <input type="password" id="regPassword" class="input" placeholder="كلمة المرور" required>
                    <button type="submit" class="btn-primary">إنشاء الحساب</button>
                </form>
            </div>
        </div>
    `;
}
