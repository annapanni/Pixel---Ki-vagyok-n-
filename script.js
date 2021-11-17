"use strict"

const characters = [
  "agi",
  "agi_szomszedja",
  "ano",
  "ciganyfiu",
  "cosmina",
  "david",
  "doktorno",
  "edit",
  "ekszereszlany",
  "focista",
  "gavriela",
  "gergo",
  "helga",
  "helga_szeretoje",
  "helga_szeretojenek_felesege",
  "jean-philippe",
  "jyran_singh",
  "klarika",
  "kovalcsik_mihaly",
  "lany_a_tenyer_tortenetebol",
  "mernok",
  "nazeli",
  "nora",
  "tanarno",
  "vak_no"
]

let activePlayer = 0

function setCard (img, charIndex, b, p){
  img.front = `kepek/${characters[charIndex]}.jpeg`
  img.back = b
  img.src = img.front
  img.up = img.front
  img.faceDown = false
  img.player = p
  img.classList.add("card")
  img.addEventListener("click", flip)
}

function flip(e){
  const img = e.target
  if (img.player === activePlayer){
    if (img.up ===  img.back) {
      turnUp(img)
      img.faceDown = false
    } else {
      turnDown(img)
      img.faceDown = true
    }
  }
}

function turnDown (img){
  img.style.transform = "rotateX(180deg)"
  setTimeout (function(){
    img.up = img.back
    img.src = img.back
  }, 280)
}
function turnUp (img){
  img.style.transform = "rotateY(0deg)"
  setTimeout (function(){
    img.up = img.front
    img.src = img.front
  }, 280)
}

function changeActive(){
  for (const i of document.querySelectorAll("img")){
    i.classList.toggle("inactive")
    if (i.player === activePlayer && i.up === i.front) turnDown(i)
  }
  activePlayer = activePlayer === 0? 1: 0
  for (const i of document.querySelectorAll("img")){
    if (i.player === activePlayer && !i.faceDown) turnUp(i)
  }
}

function genCharTable(p){
  const charTable = document.createElement("table")
  for (let i = 0; i < 5; i++){
    const row = document.createElement("tr")
    for (let j = 0; j < 5; j++){
      const cell = document.createElement("td")
      const img = document.createElement("img")
      setCard(img, i*5+j,"borito.png", p)
      if (p !== activePlayer) img.classList.add("inactive")
      cell.appendChild(img)
      row.appendChild(cell)
    }
    charTable.appendChild(row)
  }
  return charTable
}


function genPlayerCard(p) {
  const pc = document.createElement("img")
  setCard(pc, Math.floor(Math.random()*24),"borito2.png", p)
  if (p !== activePlayer) pc.classList.add("inactive")
  turnDown(pc)
  pc.faceDown = true
  return pc
}

function newGame(){
  for (const i of document.querySelectorAll("img")){
    i.faceDown = false
    turnUp(i)
  }
  const [playerCard0New, playerCard1New] = [genPlayerCard(0), genPlayerCard(1)]
  p0con.replaceChild(playerCard0New, playerCard0)
  p1con.replaceChild(playerCard1New, playerCard1)
  playerCard0 = playerCard0New
  playerCard1 = playerCard1New
}


let [playerCard0, playerCard1] = [genPlayerCard(0), genPlayerCard(1)]
const playerTable0 = genCharTable(0)
const playerTable1 = genCharTable(1)

const nextbtn = document.createElement("button")
nextbtn.innerText = "Kör vége"
nextbtn.addEventListener("click", changeActive)
const newGamebtn = document.createElement("button")
newGamebtn.innerText = "Új játék"
newGamebtn.style.fontSize = "12px"
newGamebtn.addEventListener("click", newGame)
const btns = document.createElement("div")
btns.appendChild(newGamebtn)
btns.appendChild(nextbtn)

const p0con = document.createElement("div")
p0con.classList.add("container")
//p0con.style.width = `900px`
p0con.appendChild(playerCard0)
p0con.appendChild(playerTable0)

const p1con = document.createElement("div")
p1con.classList.add("container")
p1con.appendChild(playerTable1)
p1con.appendChild(playerCard1)

const container = document.createElement("div")
container.classList.add("container")
container.id = "maincontainer"
container.appendChild(p0con)
container.appendChild(btns)
container.appendChild(p1con)

document.body.appendChild(container)
