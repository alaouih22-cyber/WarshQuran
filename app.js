let currentPage = 392;
let uiVisible = false;

const mushafArea = document.getElementById('mushaf-area');
const uiOverlay = document.getElementById('ui-overlay');
const sideMenu = document.getElementById('side-menu');

// Mostra/Nasconde i menu al click sulla pagina
mushafArea.onclick = (e) => {
    // Se clicchi al centro mostra i menu
    const x = e.clientX;
    const width = window.innerWidth;
    
    if (x > width * 0.2 && x < width * 0.8) {
        uiVisible = !uiVisible;
        uiOverlay.classList.toggle('ui-hidden', !uiVisible);
    } else if (x <= width * 0.2) {
        // Clicca a sinistra (Avanti pagina)
        changePage(currentPage + 1);
    } else {
        // Clicca a destra (Indietro pagina)
        changePage(currentPage - 1);
    }
};

function changePage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    document.getElementById('quran-img').src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
    document.getElementById('page-num').textContent = n;
}

// Apri il menu laterale
document.getElementById('menu-trigger').onclick = (e) => {
    e.stopPropagation();
    sideMenu.classList.remove('hidden');
};

// Chiudi menu cliccando fuori
sideMenu.onclick = () => sideMenu.classList.add('hidden');
