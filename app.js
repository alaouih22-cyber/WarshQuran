document.addEventListener('DOMContentLoaded', () => {
    // Registrazione Service Worker per la PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registrato con successo.', reg))
            .catch(err => console.error('Errore registrazione Service Worker', err));
    }

    // Elementi DOM
    const verseAreas = document.querySelectorAll('.verse-clickable-area');
    const tafsirModal = document.getElementById('tafsir-modal');
    const closeTafsirBtn = document.getElementById('close-tafsir');
    const tafsirTitle = document.getElementById('tafsir-title');
    const tafsirText = document.getElementById('tafsir-text');
    
    const bookmarksBtn = document.getElementById('bookmarks-btn');
    const bookmarksModal = document.getElementById('bookmarks-modal');
    const closeBookmarksBtn = document.getElementById('close-bookmarks');
    const bookmarksList = document.getElementById('bookmarks-list');
    const addBookmarkBtn = document.getElementById('add-bookmark-verse');

    const playPauseBtn = document.getElementById('play-pause-btn');
    const playVerseAudioBtn = document.getElementById('play-verse-audio');
    const audioPlayer = document.getElementById('quran-audio-player');
    const reciterSelect = document.getElementById('reciter-select');
    const tafsirSelect = document.getElementById('tafsir-select');

    // Stato dell'App
    let isPlaying = false;
    let currentSurah = 1;
    let currentVerse = 1;
    let bookmarks = JSON.parse(localStorage.getItem('quran_bookmarks')) || [];

    // --- Logica Click Versetto e Tafsir ---
    verseAreas.forEach(area => {
        area.addEventListener('click', function() {
            // Rimuovi classe attiva dagli altri
            verseAreas.forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            const surah = this.getAttribute('data-surah');
            const verse = this.getAttribute('data-verse');
            const selectedTafsir = tafsirSelect.options[tafsirSelect.selectedIndex].text;

            currentSurah = surah;
            currentVerse = verse;

            // Popola la modale
            tafsirTitle.textContent = `Sura ${surah}, Versetto ${verse} - ${selectedTafsir}`;
            tafsirText.textContent = `Questo è un testo dimostrativo del tafsir per la Sura ${surah}, Ayah ${verse}. In un'app reale, qui verrebbe effettuata una chiamata API per scaricare il testo di ${selectedTafsir}.`;
            
            tafsirModal.classList.remove('hidden');
        });
    });

    closeTafsirBtn.addEventListener('click', () => tafsirModal.classList.add('hidden'));

    // --- Logica Audio ---
    const togglePlay = () => {
        const reciter = reciterSelect.value;
        // URL dimostrativo. In produzione usare API ufficiali come everyayah.com
        const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3`; 
        
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            if(audioPlayer.src !== audioUrl) {
                audioPlayer.src = audioUrl;
            }
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    };

    playPauseBtn.addEventListener('click', togglePlay);
    
    playVerseAudioBtn.addEventListener('click', () => {
        // Riproduce l'audio specifico dalla modale del Tafsir
        togglePlay();
        tafsirModal.classList.add('hidden');
    });

    audioPlayer.addEventListener('ended', () => {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    // --- Logica Segnalibri ---
    const renderBookmarks = () => {
        bookmarksList.innerHTML = '';
        if (bookmarks.length === 0) {
            bookmarksList.innerHTML = '<li class="empty-state">Nessun segnalibro salvato.</li>';
            return;
        }

        bookmarks.forEach((bm, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>Sura ${bm.surah}, Versetto ${bm.verse}</span>
                <button class="bookmark-go-btn" data-index="${index}">Vai</button>
            `;
            bookmarksList.appendChild(li);
        });

        // Eventi per bottoni "Vai"
        document.querySelectorAll('.bookmark-go-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                const bm = bookmarks[idx];
                alert(`Navigazione alla Sura ${bm.surah}, Versetto ${bm.verse} (Logica da implementare con dati reali)`);
                bookmarksModal.classList.add('hidden');
            });
        });
    };

    addBookmarkBtn.addEventListener('click', () => {
        const exists = bookmarks.find(b => b.surah == currentSurah && b.verse == currentVerse);
        if (!exists) {
            bookmarks.push({ surah: currentSurah, verse: currentVerse });
            localStorage.setItem('quran_bookmarks', JSON.stringify(bookmarks));
            alert('Segnalibro salvato con successo!');
            renderBookmarks();
        } else {
            alert('Questo versetto è già nei segnalibri.');
        }
    });

    bookmarksBtn.addEventListener('click', () => {
        renderBookmarks();
        bookmarksModal.classList.remove('hidden');
    });
    closeBookmarksBtn.addEventListener('click', () => bookmarksModal.classList.add('hidden'));

    // Inizializza segnalibri al caricamento
    renderBookmarks();
});
