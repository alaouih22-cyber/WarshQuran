const surahSelect = document.getElementById('surahSelect');
const pageImg = document.getElementById('pageImg');
const pageInput = document.getElementById('pageInput');

// 1. Carica la lista delle Sure dall'API
async function loadSurahs() {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        const surahs = data.data;

        surahSelect.innerHTML = ''; // Pulisce il caricamento
        surahs.forEach(surah => {
            const option = document.createElement('option');
            option.value = surah.number;
            option.textContent = `${surah.number}. ${surah.name} (${surah.englishName})`;
            surahSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Errore nel caricamento delle sure:", error);
        surahSelect.innerHTML = '<option>Errore nel caricamento</option>';
    }
}

// 2. Funzione per cambiare la pagina del Mushaf Tajweed
function updatePage(pageNumber) {
    const loading = document.getElementById('loadingOverlay');
    if(loading) loading.classList.remove('hidden');
    
    // Usiamo un server di immagini che supporta il Tajweed (es. SearchTruth o simili)
    // Nota: Il numero di pagina deve essere formattato a 3 cifre (es. 001, 002)
    const formattedPage = String(pageNumber).padStart(3, '0');
    pageImg.src = `https://www.searchtruth.org/quran/images2/tajweed/${pageNumber}.jpg`;
    
    pageImg.onload = () => {
        if(loading) loading.classList.add('hidden');
    };
}

// Event Listeners
surahSelect.addEventListener('change', async (e) => {
    const surahNum = e.target.value;
    // Recupera la prima pagina di quella Sura
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNum}`);
    const data = await res.json();
    const firstPage = data.data.ayahs[0].page;
    pageInput.value = firstPage;
    updatePage(firstPage);
});

pageInput.addEventListener('change', (e) => {
    updatePage(e.target.value);
});

// Inizializzazione
loadSurahs();
