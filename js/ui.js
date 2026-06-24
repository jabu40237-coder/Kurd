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
