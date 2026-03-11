// Database Completo delle 114 Sure
const surahData = [
    {id:1, name:"الفاتحة", p:1}, {id:2, name:"البقرة", p:2}, {id:3, name:"آل عمران", p:50},
    {id:4, name:"النساء", p:77}, {id:5, name:"المائدة", p:106}, {id:6, name:"الأنعام", p:128},
    {id:7, name:"الأعراف", p:151}, {id:8, name:"الأنفال", p:177}, {id:9, name:"التوبة", p:187},
    {id:10, name:"يونس", p:208}, {id:11, name:"هود", p:221}, {id:12, name:"يوسف", p:235},
    {id:13, name:"الرعد", p:249}, {id:14, name:"إبراهيم", p:255}, {id:15, name:"الحجر", p:262},
    {id:16, name:"النحل", p:267}, {id:17, name:"الإسراء", p:282}, {id:18, name:"الكهف", p:293},
    {id:19, name:"مريم", p:305}, {id:20, name:"طه", p:312}, {id:21, name:"الأنبياء", p:322},
    {id:22, name:"الحج", p:332}, {id:23, name:"المؤمنون", p:342}, {id:24, name:"النور", p:350},
    {id:25, name:"الفرقان", p:359}, {id:26, name:"الشعراء", p:367}, {id:27, name:"النمل", p:377},
    {id:28, name:"القصص", p:385}, {id:29, name:"العنكبوت", p:396}, {id:30, name:"الروم", p:404},
    {id:31, name:"لقمان", p:411}, {id:32, name:"السجدة", p:415}, {id:33, name:"الأحزاب", p:418},
    {id:34, name:"سبأ", p:428}, {id:35, name:"فاطر", p:434}, {id:36, name:"يس", p:440},
    {id:37, name:"الصافات", p:446}, {id:38, name:"ص", p:453}, {id:39, name:"الزمر", p:458},
    {id:40, name:"غافر", p:467}, {id:41, name:"فصلت", p:477}, {id:42, name:"الشورى", p:483},
    {id:43, name:"الزخرف", p:489}, {id:44, name:"الدخان", p:496}, {id:45, name:"الجاثية", p:499},
    {id:46, name:"الأحقاف", p:502}, {id:47, name:"محمد", p:507}, {id:48, name:"الفتح", p:511},
    {id:49, name:"الحجرات", p:515}, {id:50, name:"ق", p:518}, {id:51, name:"الذاريات", p:521},
    {id:52, name:"الطور", p:523}, {id:53, name:"النجم", p:526}, {id:54, name:"القمر", p:528},
    {id:55, name:"الرحمن", p:531}, {id:56, name:"الواقعة", p:534}, {id:57, name:"الحديد", p:537},
    {id:58, name:"المجادلة", p:542}, {id:59, name:"الحشر", p:545}, {id:60, name:"الممتحنة", p:549},
    {id:61, name:"الصف", p:551}, {id:62, name:"الجمعة", p:553}, {id:63, name:"المنافقون", p:554},
    {id:64, name:"التغابن", p:556}, {id:65, name:"الطلاق", p:558}, {id:66, name:"التحريم", p:560},
    {id:67, name:"الملك", p:562}, {id:68, name:"القلم", p:564}, {id:69, name:"الحاقة", p:566},
    {id:70, name:"المعارج", p:568}, {id:71, name:"نوح", p:570}, {id:72, name:"الجن", p:572},
    {id:73, name:"المزمل", p:574}, {id:74, name:"المدثر", p:575}, {id:75, name:"القيامة", p:577},
    {id:76, name:"الإنسان", p:578}, {id:77, name:"المرسلات", p:580}, {id:78, name:"النبأ", p:582},
    {id:79, name:"النازعات", p:583}, {id:80, name:"عبس", p:585}, {id:81, name:"التكوير", p:586},
    {id:82, name:"الانفطار", p:587}, {id:83, name:"المطففين", p:588}, {id:84, name:"الانشقاق", p:589},
    {id:85, name:"البروج", p:590}, {id:86, name:"الطارق", p:591}, {id:87, name:"الأعلى", p:592},
    {id:88, name:"الغاشية", p:592}, {id:89, name:"الفجر", p:593}, {id:90, name:"البلد", p:594},
    {id:91, name:"الشمس", p:595}, {id:92, name:"الليل", p:595}, {id:93, name:"الضحى", p:596},
    {id:94, name:"الشرح", p:596}, {id:95, name:"التين", p:597}, {id:96, name:"العلق", p:597},
    {id:97, name:"القدر", p:598}, {id:98, name:"البينة", p:598}, {id:99, name:"الزلزلة", p:599},
    {id:100, name:"العاديات", p:599}, {id:101, name:"القارعة", p:600}, {id:102, name:"التكاثر", p:600},
    {id:103, name:"العصر", p:601}, {id:104, name:"الهمزة", p:601}, {id:105, name:"الفيل", p:601},
    {id:106, name:"قريش", p:602}, {id:107, name:"الماعون", p:602}, {id:108, name:"الكوثر", p:602},
    {id:109, name:"الكافرون", p:603}, {id:110, name:"النصر", p:603}, {id:111, name:"المسد", p:603},
    {id:112, name:"الإخلاص", p:604}, {id:113, name:"الفلق", p:604}, {id:114, name:"الناس", p:604}
];

let currentPage = 392; 
const img = document.getElementById('quran-page');
const audio = document.getElementById('quran-audio');
const loader = document.getElementById('loading-overlay');

// 1. Funzione Carica Pagina (Aggiornata con link EasyQuran PNG)
function loadPage(n) {
    if (n < 1 || n > 604) return;
    currentPage = n;
    
    loader.style.display = "block";
    img.style.display = "none";
    
    // Formattiamo il numero della pagina a 3 cifre (es: 1 -> 001, 10 -> 010)
    let pageNumFormatted = n.toString().padStart(3, '0');
    
    // Link diretto alle immagini PNG dal sito EasyQuran (Versione Tajweed Warsh)
    img.src = `https://easyquran.com/tajweed-warsh/warsh-${pageNumFormatted}.png`;
    
    img.onload = () => {
        loader.style.display = "none";
        img.style.display = "block";
        document.getElementById('page-num').textContent = n;
        updateSurahName(n);
    };
    
    img.onerror = () => {
        // Backup: se EasyQuran non risponde, usa il server alternativo
        img.src = `https://pwanew.mohib.me/tajweed_png/${n}.png`;
        console.log("Errore: Caricamento immagine di backup.");
    };
}

// 2. Aggiorna il Nome della Sura
function updateSurahName(p) {
    let currentS = surahData[0].name;
    for(let s of surahData) {
        if (p >= s.p) currentS = s.name;
        else break;
    }
    document.getElementById('surah-title').textContent = currentS;
}

// 3. Genera Indice Menu
function buildSurahIndex() {
    const container = document.getElementById('surah-index-container');
    let html = "";
    surahData.forEach((s, i) => {
        html += `<div class="index-item" onclick="goToSurah(${s.p})">
                    <span class="s-num">${i+1}</span>
                    <span class="s-name">${s.name}</span>
                    <span class="s-page">صفحة ${s.p}</span>
                 </div>`;
    });
    container.innerHTML = html;
}

function goToSurah(p) {
    loadPage(p);
    closeAll();
}

// 4. Audio Player
let isPlaying = false;
document.getElementById('play-audio-btn').onclick = () => {
    if(!isPlaying) {
        audio.src = `https://download.quranicaudio.com/quran/mishari_rashid_al-afasy/001.mp3`;
        audio.play();
        document.getElementById('play-audio-btn').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        document.getElementById('play-audio-btn').innerHTML = '<i class="fas fa-play"></i>';
    }
    isPlaying = !isPlaying;
};

// 5. Navigazione Touch (Sinistra avanti, Destra indietro)
document.getElementById('mushaf-container').onclick = (e) => {
    const x = e.clientX;
    const w = window.innerWidth;
    const uiLayer = document.getElementById('ui-layer');

    if (x > w * 0.3 && x < w * 0.7) {
        uiLayer.classList.toggle('hidden');
    } else if (x <= w * 0.3) {
        loadPage(currentPage + 1);
    } else {
        loadPage(currentPage - 1);
    }
};

// 6. Gestione Menu
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeAll() {
    document.getElementById('surah-list').classList.add('hidden');
    document.getElementById('ui-layer').classList.add('hidden');
}

// Inizializzazione
buildSurahIndex();
loadPage(currentPage);
