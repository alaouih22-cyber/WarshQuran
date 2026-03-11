// Database delle 114 Sure (Medina)
const surahData = [
    {id:1, name:"الفاتحة", p:1}, {id:2, name:"البقرة", p:2}, {id:3, name:"آل عمران", p:50},
    // ... (mantieni tutto l'elenco delle sure che ti ho dato prima)
];

let currentPage = 1; // Partiamo dalla Fatiha per vedere la tua foto
const img = document.getElementById('quran-page');
const loader = document.getElementById('loading-overlay');
const cacheName = 'quran-warsh-cache-v1';

async function loadPage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    
    const pNum = n.toString().padStart(3, '0');
    let url;

    // Se è la pagina 1, usa l'immagine che hai caricato (salvala come 1.png su GitHub)
    if (n === 1) {
        url = `img/1.png`; 
    } else {
        url = `https://easyquran.com/tajweed-warsh/warsh-${pNum}.png`;
    }

    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);

    if (cachedResponse) {
        const blob = await cachedResponse.blob();
        img.src = URL.createObjectURL(blob);
        loader.style.display = "none";
    } else {
        loader.style.display = "block";
        img.src = url;
        img.onload = async () => {
            loader.style.display = "none";
            // Per le immagini esterne, salva in cache
            if (url.startsWith('http')) {
                const response = await fetch(url);
                if (response.ok) cache.put(url, response);
            }
        };
    }

    document.getElementById('page-num').textContent = n;
    updateSurahName(n);
    preloadNext(n + 1);
}

// ... (mantieni le altre funzioni buildSurahIndex, updateSurahName, etc. dello script precedente)

buildSurahIndex();
loadPage(currentPage);
