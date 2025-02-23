// sätt den till en slumpmässig x position och sedan y beroende på om den är på en kant eller i några av mittenkolumnerna. svår att skrifligt förklara :/
function generatePointLocation () {
    point.set(LedSpriteProperty.X, randint(0, 4))
    if (point.get(LedSpriteProperty.X) == 0) {
        point.set(LedSpriteProperty.Y, randint(0, 4))
    } else if (point.get(LedSpriteProperty.X) == 1) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            point.set(LedSpriteProperty.Y, 0)
        } else {
            point.set(LedSpriteProperty.Y, 4)
        }
    } else if (point.get(LedSpriteProperty.X) == 2) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            point.set(LedSpriteProperty.Y, 0)
        } else {
            point.set(LedSpriteProperty.Y, 4)
        }
    } else if (point.get(LedSpriteProperty.X) == 3) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            point.set(LedSpriteProperty.Y, 0)
        } else {
            point.set(LedSpriteProperty.Y, 4)
        }
    } else {
        point.set(LedSpriteProperty.Y, randint(0, 4))
    }
}
// Vänd spelaren och även andra riktningsvariabeln för att det skräddarsydda svängsystemet ska fungera
input.onButtonPressed(Button.A, function () {
    playerSprite.turn(Direction.Right, 180)
    if (direction == 1) {
        direction = 0
    } else {
        direction = 1
    }
})
// nästan identisk till generatePointLocation bara det att denna genererar muren istället för målet
function generateBlockLocation () {
    block.set(LedSpriteProperty.X, randint(0, 4))
    if (block.get(LedSpriteProperty.X) == 0) {
        block.set(LedSpriteProperty.Y, randint(0, 4))
    } else if (block.get(LedSpriteProperty.X) == 1) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            block.set(LedSpriteProperty.Y, 0)
        } else {
            block.set(LedSpriteProperty.Y, 4)
        }
    } else if (block.get(LedSpriteProperty.X) == 2) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            block.set(LedSpriteProperty.Y, 0)
        } else {
            block.set(LedSpriteProperty.Y, 4)
        }
    } else if (block.get(LedSpriteProperty.X) == 3) {
        trueorfalse = randint(0, 1)
        if (trueorfalse == 0) {
            block.set(LedSpriteProperty.Y, 0)
        } else {
            block.set(LedSpriteProperty.Y, 4)
        }
    } else {
        block.set(LedSpriteProperty.Y, randint(0, 4))
    }
}
// Kolla ifall spelaren nuddar målet. om ja:
// lägg till poäng
// gör spelaren snabbare
// varje tio poäng får man ett extra liv
// om nej:
// spela ett ljud så man vet att man misslyckats och ta bort ett liv
// generera nya positioner för muren och målet
// pausa spelet i en halv sekund för att spelaren ska ha en chans att se banan innan det startar. främst för höga hastigheter
input.onButtonPressed(Button.B, function () {
    if (playerSprite.isTouching(point)) {
        game.addScore(1)
        music.play(music.createSoundExpression(WaveShape.Square, 1, 5000, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        if (playerSpeed > 100) {
            playerSpeed += -40
        }
        if (game.score() % 5 == 0) {
            game.addLife(1)
        }
    } else {
        game.removeLife(1)
        music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    while (point.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) && point.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y) || (playerSprite.get(LedSpriteProperty.X) == point.get(LedSpriteProperty.X) || playerSprite.get(LedSpriteProperty.Y) == point.get(LedSpriteProperty.Y))) {
        generatePointLocation()
    }
    while (point.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) && point.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y) || (playerSprite.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) || playerSprite.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y))) {
        generateBlockLocation()
    }
    paused = 1
    basic.pause(500)
    paused = 0
})
// Skapa spelare
// Sätt riktning
// Skapa första målet
// Skapa första blockeringen
// Ändra ljusstyrkor för tydlighet
// Skapa liv
// Sätt startvärde för hastighet
// Se till att spelet är opausat
let trueorfalse = 0
let paused = 0
let playerSpeed = 0
let block: game.LedSprite = null
let point: game.LedSprite = null
let direction = 0
let playerSprite: game.LedSprite = null
playerSprite = game.createSprite(2, 4)
direction = 1
point = game.createSprite(2, 0)
block = game.createSprite(0, 2)
block.set(LedSpriteProperty.Brightness, 55)
point.set(LedSpriteProperty.Blink, 250)
point.set(LedSpriteProperty.Brightness, 55)
game.setLife(3)
playerSpeed = 500
paused = 0
// ta ett steg och kolla sen ifall man är i ett hörn och isåfall svänger man
// sedan kollar man ifall man slagit i muren och isäfall tar man skada, ett ljud spelas och man "studsar."
basic.forever(function () {
    while (paused == 0) {
        playerSprite.move(1)
        if (playerSprite.get(LedSpriteProperty.X) == 4 && playerSprite.get(LedSpriteProperty.Y) == 4 || playerSprite.get(LedSpriteProperty.X) == 4 && playerSprite.get(LedSpriteProperty.Y) == 0 || (playerSprite.get(LedSpriteProperty.X) == 0 && playerSprite.get(LedSpriteProperty.Y) == 0 || playerSprite.get(LedSpriteProperty.X) == 0 && playerSprite.get(LedSpriteProperty.Y) == 4)) {
            if (direction == 1) {
                playerSprite.turn(Direction.Left, 90)
            } else {
                playerSprite.turn(Direction.Left, -90)
            }
        }
        if (playerSprite.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) && playerSprite.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y)) {
            game.removeLife(1)
            music.play(music.createSoundExpression(WaveShape.Sine, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
            playerSprite.turn(Direction.Right, 180)
            if (direction == 1) {
                direction = 0
            } else {
                direction = 1
            }
        }
        basic.pause(playerSpeed)
    }
    basic.pause(200)
})
