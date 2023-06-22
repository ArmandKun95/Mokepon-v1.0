const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.static('public'))
app.use (cors())
app.use (express.json())

const Players = []

class PLayer {
    constructor(id) {
        this.id = id
    }

    assignMokepon(mokepon){
        this.mokepon = mokepon
    }

    updatePosition(X, Y) {
        this.X = X
        this.Y = Y
    }

    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/Join", (req, res) => {
    const id = `${Math.random()}`

    const Player = new PLayer(id)

    Players.push(Player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/mokepon/:playerId", (req, res) => {
    const playerId = req.params.playerId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const playerIndex = Players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        Players[playerIndex].assignMokepon(mokepon)
    }

    console.log(Players)
    console.log(playerId)
    res.end()
})

app.post("/mokepon/:playerId/position", (req,res) => {
    const playerId = req.params.playerId || ""
    const X = req.body.X || 0
    const Y = req.body.Y || 0

    const playerIndex = Players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        Players[playerIndex].updatePosition(X, Y)
    }

    const enemys = Players.filter((player) => playerId !== player.id)

    res.send({
        enemys
    })
})

app.post("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const attacks = req.body.attacks || []
    
    const playerIndex = Players.findIndex((player) => playerId === player.id)

    if (playerIndex >= 0) {
        Players[playerIndex].assignAttacks(attacks)
    }

    res.end()
})

app.get("/mokepon/:playerId/attacks", (req, res) => {
    const playerId = req.params.playerId || ""
    const player = Players.find((player) => player.id === playerId)
    res.send({
        attacks: player.attacks || []
    })
})

app.listen(8080, () => {
    console.log("Link Start")
})