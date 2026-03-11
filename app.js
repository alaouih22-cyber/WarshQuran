const mushaf=document.getElementById("mushaf")

function openPage(){

let page=prompt("Numero pagina Mushaf (1-604)")

mushaf.innerHTML=

`<img src="mushaf/pages/${page}.png">`

}

function playAyah(code){

let audio=

new Audio(
"https://everyayah.com/data/Husary_Warsh_64kbps/"+code+".mp3"
)

audio.play()

}

async function showTafsir(surah,ayah){

let res=await fetch("data/tafsir.json")

let data=await res.json()

let t=data.find(
x=>x.surah==surah && x.ayah==ayah
)

document.getElementById("tafsirText").innerHTML=t.text

document.getElementById("tafsirBox").style.display="block"

}

function closeTafsir(){

document.getElementById("tafsirBox").style.display="none"

}
