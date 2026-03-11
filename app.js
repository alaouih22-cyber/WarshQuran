function openPage(){

let page = prompt("Numero pagina Mushaf (1-604)")

page = page.padStart(3,"0")

document.getElementById("mushaf").innerHTML =
`<img src="https://raw.githubusercontent.com/QuranHub/quran-pages-images/main/warsh/${page}.png" style="max-width:100%">`

}
