import { auth, db, storage } from './firebase.js';
import { showToast } from './ui.js';

export async function renderUserDashboard() {
    const user = auth.currentUser;
    if (!user) return;
    
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section">
            <h1>مرحباً، ${user.email.split('@')[0]}</h1>
            <div class="grid" style="grid-template-columns: 300px 1fr;">
                <div class="card">
                    <img id="profilePic" src="${user.photoURL || 'https://via.placeholder.com/150'}" style="width:100px; height:100px; border-radius:50%; display:block; margin:0 auto;">
                    <input type="file" id="picUpload" accept="image/*" class="input" style="margin-top:1rem;">
                    <button class="btn-primary" id="uploadBtn">رفع الصورة</button>
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

    document.getElementById('uploadBtn').addEventListener('click', async () => {
        const file = document.getElementById('picUpload').files[0];
        if (!file) return showToast('تنبيه', 'اختر صورة أولاً');
        
        try {
            const storageRef = storage.ref(`avatars/${user.uid}`);
            await storageRef.put(file);
            const url = await storageRef.getDownloadURL();
            await user.updateProfile({ photoURL: url });
            await db.collection('users').doc(user.email).update({ photoURL: url });
            document.getElementById('profilePic').src = url;
            showToast('تم', 'تم تحديث الصورة الشخصية!');
        } catch (error) {
            showToast('خطأ', error.message);
        }
    });

    document.getElementById('changePassBtn').addEventListener('click', () => {
        auth.sendPasswordResetEmail(user.email);
        showToast('تم', 'تم إرسال رابط تغيير كلمة المرور لإيميلك');
    });
}
