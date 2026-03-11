let currentPage = 392; 
let isUiVisible = false;

const mushaf = document.getElementById('mushaf-area');
const ui = document.getElementById('ui-controls');
const sideMenu = document.getElementById('side-menu');

// Clicca per interagire
mushaf.onclick = (e) => {
    const x = e.clientX;
    const w = window.innerWidth;

    if (x > w * 0.2 && x < w * 0.8) {
        // Clic al centro: mostra/nascondi menu
        isUiVisible = !isUiVisible;
        ui.classList.toggle('hidden-ui', !isUiVisible);
    } else if (x <= w * 0.2) {
        // Clic sinistra: Pagina successiva
        updatePage(currentPage + 1);
    } else {
        // Clic destra: Pagina precedente
        updatePage(currentPage - 1);
    }
};

function updatePage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    // Carica immagine reale Tajweed da internet
    document.getElementById('quran-img').src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    document.getElementById('page-num').textContent = n;
}

// Apri Menu
document.getElementById('btn-main-menu').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.remove('hidden');
};

sideMenu.onclick = () => sideMenu.classList.add('hidden');
