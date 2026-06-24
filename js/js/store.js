import { showToast } from './ui.js';

const defaultProducts = [
    { id: 'chatgpt', name: 'ChatGPT Plus', price: 20, cat: 'ai', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400' },
    { id: 'netflix', name: 'Netflix Premium', price: 15, cat: 'stream', img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400' },
    { id: 'spotify', name: 'Spotify Premium', price: 10, cat: 'stream', img: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400' },
    { id: 'pubg', name: 'بطاقات PUBG', price: 5, cat: 'games', img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400' }
];

export function renderStore() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="section">
            <h1 style="margin-bottom:2rem;">المتجر الرقمي</h1>
            <input type="text" id="storeSearch" class="input" placeholder="ابحث عن منتج..." style="max-width:300px;">
            <div class="grid" id="storeGrid" style="margin-top:2rem;"></div>
        </div>
    `;
    
    const grid = document.getElementById('storeGrid');
    defaultProducts.forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <img src="${p.img}" style="width:100%; height:120px; object-fit:cover; border-radius:8px;">
                <h3 style="margin:1rem 0;">${p.name}</h3>
                <p style="color:var(--accent-lime); font-weight:bold;">$${p.price}</p>
                <button class="btn-primary" onclick="window.addToFav('${p.id}')"><i class="fas fa-heart"></i> أضف للمفضلة</button>
            </div>
        `;
    });

    document.getElementById('storeSearch').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const items = grid.getElementsByClassName('card');
        Array.from(items).forEach(item => {
            if (item.innerText.toLowerCase().includes(q)) item.style.display = '';
            else item.style.display = 'none';
        });
    });
}

window.addToFav = (id) => {
    showToast('تم', 'تمت الإضافة للمفضلة!');
};
