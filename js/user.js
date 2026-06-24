import { auth, db } from './firebase.js';
import { showToast } from './ui.js';

export async function renderUserDashboard() {
    const user = auth.currentUser;
    if (!user) return;
    
    // جلب بيانات المستخدم من قاعدة البيانات
    const userDoc = await db.collection('users').doc(user.email).get();
    const currentPhoto = userDoc.exists && userDoc.data().photoURL ? userDoc.data().photoURL : 'https://via.placeholder.com/150';
    
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section">
            <h1>مرحباً، ${user.email.split('@')[0]}</h1>
            <div class="grid" style="grid-template-columns: 300px 1fr;">
                <div class="card" style="text-align:center;">
                    <img id="profilePic" src="${currentPhoto}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; margin:0 auto;">
                    <input type="file" id="picUpload" accept="image/*" class="input" style="margin-top:1rem;">
                    <button class="btn-primary" id="uploadBtn">رفع الصورة الشخصية</button>
                </div>
                <div class="card">
                    <h3>الإعدادات</h3>
                    <button class="btn-primary" style="background:var(--accent-purple); color:#fff;" id="changePassBtn">تغيير كلمة المرور</button>
                    <h3 style="margin-top:2rem;">سجل الطلبات</h3>
                    <p>لا توجد طلبات حالياً.</p>
                </div>
            </div>
        </div>
    `;

    // رفع الصورة وتحويلها إلى Base64 لتجنب تكاليف Firebase Storage
    document.getElementById('uploadBtn').addEventListener('click', () => {
        const file = document.getElementById('picUpload').files[0];
        if (!file) return showToast('تنبيه', 'اختر صورة أولاً');
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = async () => {
                // ضغط الصورة لتكون صغيرة الحجم (150x150) لتناسب قاعدة البيانات
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                let w = img.width, h = img.height;
                const max = 150;
                if (w > h) { if (w > max) { h *= max / w; w = max; } } else { if (h > max) { w *= max / h; h = max; } }
                canvas.width = w; canvas.height = h;
                ctx.drawImage(img, 0, 0, w, h);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

                try {
                    // حفظ رابط الصورة (ككود) في قاعدة البيانات
                    await db.collection('users').doc(user.email).update({ photoURL: dataUrl });
                    document.getElementById('profilePic').src = dataUrl;
                    showToast('تم', 'تم تحديث صورتك الشخصية بنجاح!');
                } catch (error) {
                    showToast('خطأ', error.message);
                }
            };
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('changePassBtn').addEventListener('click', () => {
        auth.sendPasswordResetEmail(user.email);
        showToast('تم', 'تم إرسال رابط تغيير كلمة المرور لإيميلك');
    });
}
