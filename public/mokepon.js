const sectionSelectAttack = document.getElementById("Select-Attack")
const sectionBotonReboot = document.getElementById("boton-Reboot")
const botonMonster = document.getElementById("Boton-Monster")
const botonReboot = document.getElementById("boton-Reboot")

const sectionSelectMonsterPlayer = document.getElementById("Select-Monster")

const spanMonsterPlayer = document.getElementById("monster-player")

const spanMonsterEnemy = document.getElementById("monster-enemy")

const spanPlayerHP = document.getElementById("player-HP")
const spanEnemyHP = document.getElementById("enemy-HP")

const sectionMsj = document.getElementById("result")
const playerAttack = document.getElementById("player-attack")
const enemyAttack = document.getElementById("enemy-attack")
const CardsContent = document.getElementById("CardsContent")
const attackContainer = document.getElementById("attackContainer")

const sectionViewMap = document.getElementById("view-map")
const map = document.getElementById("map")

let playerId = null
let enemyId = null
let mokepones = []
let mokeponesEnemys = []
let AttackPlayer = []
let AttackEnemy = []
let mokeponOptions
let inputKojirou
let inputRoll
let inputNatsu
let inputUri
let monsterPlayer
let objectPlayerMokepon
let attackMokepon
let attackMokeponEnemy
let botonWater
let botonPlant
let botonFire
let botones = []
let indexAttackPlayer
let indexAttackEnemy
let victoryPlayer = 0
let victoryEnemy = 0
let PlayerHP = 3
let EnemyHP = 3
let canva = map.getContext("2d")
let intervalo
let mapBackground = new Image()
mapBackground.src = "./assets/mokemap.png"
let anchoMapa = window.innerWidth - 20
let altoMapa
const anchoMaxMap = 350

if(anchoMapa > anchoMaxMap) {
    anchoMapa = anchoMaxMap - 20
}

altoMapa = anchoMapa * 600 / 800

map.width = anchoMapa
map.height = altoMapa

class Mokepon {
    constructor(nombre, foto, life, fotoMap, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.life = life
        this.attacks = []
        this.ancho = 40
        this.alto = 40
        this.X = aleatorio(0, map.width - this.ancho)
        this.Y = aleatorio(0, map.height - this.alto)
        this.mapfoto = new Image()
        this.mapfoto.src = fotoMap
        this.speedX = 0
        this.speedY = 0
    }

    paintMokepon() {
        canva.drawImage(
            this.mapfoto,
            this.X,
            this.Y,
            this.ancho,
            this.alto
        )
    }
}

let Kojirou = new Mokepon("Kojirou", "./assets/hipodoge.png", 5, "./assets/hipodoge1.png")

let Roll = new Mokepon("Roll", "./assets/capipepo.png", 5, "./assets/capipepo1.png")

let Natsu = new Mokepon("Natsu", "./assets/ratigueya.png", 5, "./assets/ratigueya1.png")

let Uri = new Mokepon("Uri", "./assets/langostelvis.png", 5, "./assets/langostelvis.png")

let new1 = new Mokepon("...", "./assets/newMokepon.png", 5, "./assets/newMokepon.png")

let new2 = new Mokepon("???", "./assets/newMokepon.png", 5, "./assets/newMokepon.png")

const KOJIROU_ATTACKS = [
    {nombre:"💧", id:"Boton-WATER"},
    {nombre:"💧", id:"Boton-WATER"},
    {nombre:"💧", id:"Boton-WATER"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🌱", id:"Boton-PLANT"},
]
Kojirou.attacks.push(...KOJIROU_ATTACKS)

const ROLL_ATTACKS = [
    {nombre:"🌱", id:"Boton-PLANT"},
    {nombre:"🌱", id:"Boton-PLANT"},
    {nombre:"🌱", id:"Boton-PLANT"},
    {nombre:"💧", id:"Boton-WATER"},
    {nombre:"🔥", id:"Boton-FIRE"},
]
Roll.attacks.push(...ROLL_ATTACKS)

const NATSU_ATTACKS = [
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🌱", id:"Boton-PLANT"},
    {nombre:"💧", id:"Boton-WATER"},
]
Natsu.attacks.push(...NATSU_ATTACKS)

const URI_ATTACKS = [
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🔥", id:"Boton-FIRE"},
    {nombre:"🌱", id:"Boton-PLANT"},
    {nombre:"💧", id:"Boton-WATER"},
]
Uri.attacks.push(...URI_ATTACKS)

const NEW1_ATTACKS = [
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
]


const NEW2_ATTACKS = [
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
    {nombre:"", id:"Boton-"},
]


mokepones.push(Kojirou, Roll, Natsu, Uri, new1, new2)

function startGame () {
    sectionSelectAttack.style.display = "none"
    sectionViewMap.style.display = "none"

    mokepones.forEach((Mokepon) => {
        mokeponOptions = `
        <input type="radio" name="Monster" class="input1" id=${Mokepon.nombre} />
        <label class="mokepon-card1" for=${Mokepon.nombre}>
            <p class="text1" id="text1">${Mokepon.nombre}</p>
            <img class="img1" src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
    CardsContent.innerHTML += mokeponOptions
    
    inputKojirou = document.getElementById("Kojirou")
    inputRoll = document.getElementById("Roll")
    inputNatsu = document.getElementById("Natsu")
    inputUri = document.getElementById("Uri")
    inputnew1 = document.getElementById("new1")
    inputnew1 = document.getElementById("new2")


    })

    sectionBotonReboot.style.display = "none"
    botonMonster.addEventListener("click", selectMonsterPlayer)
    botonReboot.addEventListener("click", rebootGame)
    joinTheGame()
}

function joinTheGame() {
    fetch("http://192.168.0.174:8080/Join")
        .then(function (res) {
            if (res.ok){
                res.text()
                    .then(function (answer) {
                        console.log(answer)
                        playerId = answer
                    })
            }
        })
}

function selectMonsterPlayer() {
    if (inputKojirou.checked) {
        spanMonsterPlayer.innerHTML = inputKojirou.id
        monsterPlayer = inputKojirou.id
    } else if (inputRoll.checked) {
        spanMonsterPlayer.innerHTML = inputRoll.id
        monsterPlayer = inputRoll.id
    } else if (inputNatsu.checked) {
        spanMonsterPlayer.innerHTML = inputNatsu.id
        monsterPlayer = inputNatsu.id
    } else if (inputUri.checked) {
        spanMonsterPlayer.innerHTML = inputUri.id
        monsterPlayer = inputUri.id
    } else {
        alert("SELECT A MOKEPON")
        return
    }

    sectionSelectMonsterPlayer.style.display = "none"
    
    selectMokepon(monsterPlayer)
    
    extractAttack (monsterPlayer)
    sectionViewMap.style.display = "flex"
    startMap()
}

function selectMokepon(monsterPlayer) {
    fetch(`http://192.168.0.174:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: monsterPlayer
        })
    })
}

function extractAttack (monsterPlayer) {
    let attack
    for (let i = 0; i < mokepones.length; i++) {
        if (monsterPlayer === mokepones[i].nombre) {
        attack = mokepones[i].attacks
        }
    }
    showAttacks(attack)
}

function showAttacks(attack) {
    attack.forEach((attacks) =>{
        attackMokepon = `
        <button id=${attacks.id} class="BAttack"> ${attacks.nombre} </button>
        `
        attackContainer.innerHTML += attackMokepon
    })

    botonWater = document.getElementById("Boton-WATER")
    botonPlant = document.getElementById("Boton-PLANT")
    botonFire = document.getElementById("Boton-FIRE")
    botones = document.querySelectorAll(`.BAttack`)
}

function attackSequence() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === " 🔥 ") {
                AttackPlayer.push("🔥")
                console.log(AttackPlayer)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === " 💧 ") {
                AttackPlayer.push("💧")
                console.log(AttackPlayer)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                AttackPlayer.push("🌱")
                console.log(AttackPlayer)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (AttackPlayer.length === 5) {
                sendAttacks()
            }
        })
    })
 
}

function sendAttacks () {
    fetch(`http://192.168.0.174:8080/mokepon/${playerId}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: AttackPlayer
        })
    })

    intervalo = setInterval(getAttacks, 50)
}

function getAttacks () {
    fetch(`http://192.168.0.174:8080/mokepon/${enemyId}/attacks`)
    .then(function (res) {
        if (res.ok) {
            res.json()
            .then(function ({ attacks }) {
                if (attacks.length === 5) {
                    AttackEnemy = attacks
                    combat()
                }
            })
        }
    })
}

function selectMonsterEnemy (Enemy) {
    spanMonsterEnemy.innerHTML = Enemy.nombre
    attackMokeponEnemy = Enemy.attacks
    attackSequence()
}

function AttackEnemyA () {
    let attackAleatorio = aleatorio (0, attackMokeponEnemy.length - 1)

    if (attackAleatorio == 0 || attackAleatorio == 1) {
        AttackEnemy.push("🔥")
    } else if (attackAleatorio == 2 || attackAleatorio == 3) {
        AttackEnemy.push("💧")
    } else {
        AttackEnemy.push("🌱")
    }
    console.log(AttackEnemy)
    startFight ()
}

function startFight () {
    if (AttackPlayer.length === 5) {
        combat ()
    }
}

function indexOpponents (player, enemy) {
    indexAttackPlayer = AttackPlayer [player]
    indexAttackEnemy = AttackEnemy [enemy]
}

function combat () {
    clearInterval(intervalo)
    for (let index = 0; index < AttackPlayer.length; index++) {
        if (AttackPlayer[index] === AttackEnemy[index]) {
            indexOpponents(index, index)
            createMsj("🤝 TIE 🤝")
        } else if (AttackPlayer[index] === "🔥" && AttackEnemy[index] === "🌱") {
            indexOpponents(index, index)
            createMsj("🏆 YOU WON 🏆")
            victoryPlayer++
            spanPlayerHP.innerHTML = victoryPlayer
        } else if (AttackPlayer[index] === "💧" && AttackEnemy[index] === "🔥") {
            indexOpponents(index, index)
            createMsj("🏆 YOU WON 🏆")
            victoryPlayer++
            spanPlayerHP.innerHTML = victoryPlayer
        } else if (AttackPlayer[index] === "🌱" && AttackEnemy[index] === "💧") {
            indexOpponents(index, index)
            createMsj("🏆 YOU WON 🏆")
            victoryPlayer++
            spanPlayerHP.innerHTML = victoryPlayer
        } else {
            indexOpponents(index, index)
            createMsj("☠️ YOU LOSE ☠️")
            victoryEnemy++
            spanEnemyHP.innerHTML = victoryEnemy
        }
    }
    viewVictory ()  
}

function viewVictory () {
    if (victoryPlayer === victoryEnemy) {
        createFinalMsj("🤝 ¡THIS IS A TIE! ¡GOOD GAME! 🤝")
    } else if (victoryPlayer > victoryEnemy) {
        createFinalMsj("🏆 ¡CONGRATULATIONS! ¡YOU ARE THE WINNER! 🏆")
    } else {
        createFinalMsj("IF YOU LEARN FROM DEFEAT THEN IT IS NOT A DEFEAT.")
    } 
}

function createMsj (result) { 
    let NewPlayerAttack = document.createElement("p")
    let NewEnemyAttack = document.createElement("p")

    sectionMsj.innerHTML = result
    NewPlayerAttack.innerHTML = indexAttackPlayer
    NewEnemyAttack.innerHTML = indexAttackEnemy

    playerAttack.appendChild(NewPlayerAttack)
    enemyAttack.appendChild(NewEnemyAttack)
}

function createFinalMsj (finalSmash) {
    

    sectionMsj.innerHTML = finalSmash
    
    sectionBotonReboot.style.display = "block"
}

function rebootGame () { 
    location.reload ()
}

function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function paintCanvas () {
    objectPlayerMokepon.X = objectPlayerMokepon.X + objectPlayerMokepon.speedX
    objectPlayerMokepon.Y = objectPlayerMokepon.Y + objectPlayerMokepon.speedY
    canva.clearRect(0,0, map.width, map.height)
    canva.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height,
    )
    objectPlayerMokepon.paintMokepon()

    sendPosition(objectPlayerMokepon.X, objectPlayerMokepon.Y)

    mokeponesEnemys.forEach(function (mokepon) {
        mokepon.paintMokepon()
        checkCollision(mokepon)
    })
}

function sendPosition(X, Y) {
    fetch(`http://192.168.0.174:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            X,
            Y
        })
    })
    .then(function (res){
        if (res.ok) {
            res.json()
            .then(function ({ enemys }){
                console.log(enemys)
                mokeponesEnemys = enemys.map(function (enemy) {
                    let mokeponEnemy = null
                    const mokeponNombre = enemy.mokepon.nombre || ""
                    if (mokeponNombre === "Kojirou") {
                        mokeponEnemy = new Mokepon("Kojirou", "./assets/hipodoge.png", 5, "./assets/hipodoge1.png", enemy.id)
                    } else if (mokeponNombre === "Roll") {
                        mokeponEnemy = new Mokepon("Roll", "./assets/capipepo.png", 5, "./assets/capipepo1.png", enemy.id)
                    } else if (mokeponNombre === "Natsu") {
                        mokeponEnemy = new Mokepon("Natsu", "./assets/ratigueya.png", 5, "./assets/ratigueya1.png", enemy.id)
                    } else if (mokeponNombre === "Uri") {
                        mokeponEnemy = new Mokepon("Uri", "./assets/langostelvis.png", 5, "./assets/langostelvis.png", enemy.id)
                    } 

                    mokeponEnemy.X = enemy.X
                    mokeponEnemy.Y = enemy.Y

                    return mokeponEnemy
                })
                
                
                
                
            })
        }
    })
}

function moveU() {
    objectPlayerMokepon.speedY = -5
}

function moveL() {
    objectPlayerMokepon.speedX = -5
}

function moveD() {
    objectPlayerMokepon.speedY = 5
}

function moveR() {
    objectPlayerMokepon.speedX = 5
}

function stopMove() {
    objectPlayerMokepon.speedX = 0
    objectPlayerMokepon.speedY = 0
}

function pressKey(event) {
    switch (event.key) {
        case "ArrowUp":
            moveU()
            break
        case "ArrowLeft":
            moveL()
            break
        case "ArrowDown":
            moveD()
            break
        case "ArrowRight":
            moveR()
            break
        default:
            break
    }
} 

function startMap() {
    objectPlayerMokepon = getObjectMokepon(monsterPlayer)
    intervalo = setInterval(paintCanvas, 50)
    
    window.addEventListener("keydown", pressKey)

    window.addEventListener("keyup", stopMove)
}

function getObjectMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if (monsterPlayer === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function checkCollision(Enemy) {
    if (Enemy.X === undefined || Enemy.Y === undefined) {
        return
    }
    const upEnemy = Enemy.Y
    const downEnemy = Enemy.Y + Enemy.alto
    const rightEnemy = Enemy.X + Enemy.ancho
    const leftEnemy = Enemy.X

    const upMonster = objectPlayerMokepon.Y
    const downMonster = objectPlayerMokepon.Y + objectPlayerMokepon.alto
    const rightMonster = objectPlayerMokepon.X + objectPlayerMokepon.ancho
    const leftMonster = objectPlayerMokepon.X
    
    if(
        downMonster < upEnemy ||
        upMonster > downEnemy ||
        rightMonster < leftEnemy ||
        leftMonster > rightEnemy 
    ) {
        return
    }
    stopMove()
    clearInterval(intervalo)
    console.log("3.. 2.. 1.. Fight")

    enemyId = Enemy.id
    sectionSelectAttack.style.display = "flex"
    sectionViewMap.style.display = "none"
    selectMonsterEnemy (Enemy)
}

window.addEventListener("load", startGame)


