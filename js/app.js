const surahSelect = document.getElementById('surahSelect');
const quranDiv = document.getElementById('quran');
const tafsirBox = document.getElementById('tafsirBox');
const tafsirText = document.getElementById('tafsirText');
const reciterSelect = document.getElementById('reciter');
const searchInput = document.getElementById('search');

let quranData = [];  // da quran-warsh.json
let tafsirData = []; // da tafsir.json

// carica JSON
fetch('data/quran-warsh.json').then(r=>r.json()).then(data=>{
  quranData = data;
  loadSurahList();
});

fetch('data/tafsir.json').then(r=>r.json()).then(data=>{
  tafsirData = data;
});

function loadSurahList(){
  quranData.forEach(s=>{
    let opt = document.createElement('option');
    opt.value = s.number;
    opt.text = s.number + ' - ' + s.englishName;
    surahSelect.appendChild(opt);
  });
  loadSurah(1);
}

surahSelect.onchange = ()=>loadSurah(surahSelect.value);
reciterSelect.onchange = ()=>loadSurah(surahSelect.value);

function loadSurah(num){
  quranDiv.innerHTML = '';
  const surah = quranData.find(s=>s.number==num);
  surah.ayahs.forEach(a=>{
    let div = document.createElement('div');
    div.className = 'ayah';
    div.innerHTML = `<div class="ar">${a.text} ﴿${a.numberInSurah}﴾</div>
                     <div class="it">${a.translation}</div>
                     <audio controls src="audio/${reciterSelect.value}/${a.numberInSurah}.mp3"></audio>`;
    div.onclick = ()=>showTafsir(num,a.numberInSurah);
    quranDiv.appendChild(div);
  });
}

function showTafsir(surahNum,ayahNum){
  const taf = tafsirData.find(t=>t.surah==surahNum && t.ayah==ayahNum);
  tafsirText.innerHTML = taf ? taf.text : 'Tafsir non disponibile';
  tafsirBox.style.display = 'block';
}

function closeTafsir(){ tafsirBox.style.display='none'; }
function toggleDark(){ document.body.classList.toggle('dark'); }
