def generatePointLocation():
    global trueorfalse
    point.set(LedSpriteProperty.X, randint(0, 4))
    if point.get(LedSpriteProperty.X) == 0:
        point.set(LedSpriteProperty.Y, randint(0, 4))
    elif point.get(LedSpriteProperty.X) == 1:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            point.set(LedSpriteProperty.Y, 0)
        else:
            point.set(LedSpriteProperty.Y, 4)
    elif point.get(LedSpriteProperty.X) == 2:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            point.set(LedSpriteProperty.Y, 0)
        else:
            point.set(LedSpriteProperty.Y, 4)
    elif point.get(LedSpriteProperty.X) == 3:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            point.set(LedSpriteProperty.Y, 0)
        else:
            point.set(LedSpriteProperty.Y, 4)
    else:
        point.set(LedSpriteProperty.Y, randint(0, 4))

def on_button_pressed_a():
    global direction
    playerSprite.turn(Direction.RIGHT, 180)
    if direction == 1:
        direction = 0
    else:
        direction = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def generateBlockLocation():
    global trueorfalse
    block.set(LedSpriteProperty.X, randint(0, 4))
    if block.get(LedSpriteProperty.X) == 0:
        block.set(LedSpriteProperty.Y, randint(0, 4))
    elif block.get(LedSpriteProperty.X) == 1:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            block.set(LedSpriteProperty.Y, 0)
        else:
            block.set(LedSpriteProperty.Y, 4)
    elif block.get(LedSpriteProperty.X) == 2:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            block.set(LedSpriteProperty.Y, 0)
        else:
            block.set(LedSpriteProperty.Y, 4)
    elif block.get(LedSpriteProperty.X) == 3:
        trueorfalse = randint(0, 1)
        if trueorfalse == 0:
            block.set(LedSpriteProperty.Y, 0)
        else:
            block.set(LedSpriteProperty.Y, 4)
    else:
        block.set(LedSpriteProperty.Y, randint(0, 4))

def on_button_pressed_b():
    global playerSpeed, paused
    if playerSprite.get(LedSpriteProperty.X) == point.get(LedSpriteProperty.X) and playerSprite.get(LedSpriteProperty.Y) == point.get(LedSpriteProperty.Y):
        game.add_score(1)
        if playerSpeed > 100:
            playerSpeed += -10
        if game.score() % 10 == 0:
            game.add_life(1)
            paused = 1
            game.start_countdown(5000)
            paused = 0
    else:
        game.remove_life(1)
    generatePointLocation()
    generateBlockLocation()
    while point.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) and point.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y) or (playerSprite.get(LedSpriteProperty.X) == point.get(LedSpriteProperty.X) or playerSprite.get(LedSpriteProperty.Y) == point.get(LedSpriteProperty.Y)):
        generatePointLocation()
    while point.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) and point.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y) or (playerSprite.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) or playerSprite.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y)):
        generateBlockLocation()
    paused = 1
    basic.pause(500)
    paused = 0
input.on_button_pressed(Button.B, on_button_pressed_b)

trueorfalse = 0
paused = 0
playerSpeed = 0
block: game.LedSprite = None
point: game.LedSprite = None
direction = 0
playerSprite: game.LedSprite = None
playerSprite = game.create_sprite(2, 4)
# Direction: 1 = clockwise   2 = anti-clockwise
direction = 1
point = game.create_sprite(2, 0)
block = game.create_sprite(0, 2)
block.set(LedSpriteProperty.BRIGHTNESS, 55)
point.set(LedSpriteProperty.BLINK, 250)
point.set(LedSpriteProperty.BRIGHTNESS, 55)
game.set_life(3)
playerSpeed = 400
paused = 0

def on_forever():
    global direction
    while paused == 0:
        playerSprite.move(1)
        if playerSprite.get(LedSpriteProperty.X) == 4 and playerSprite.get(LedSpriteProperty.Y) == 4 or playerSprite.get(LedSpriteProperty.X) == 4 and playerSprite.get(LedSpriteProperty.Y) == 0 or (playerSprite.get(LedSpriteProperty.X) == 0 and playerSprite.get(LedSpriteProperty.Y) == 0 or playerSprite.get(LedSpriteProperty.X) == 0 and playerSprite.get(LedSpriteProperty.Y) == 4):
            if direction == 1:
                playerSprite.turn(Direction.LEFT, 90)
            else:
                playerSprite.turn(Direction.LEFT, -90)
        if playerSprite.get(LedSpriteProperty.X) == block.get(LedSpriteProperty.X) and playerSprite.get(LedSpriteProperty.Y) == block.get(LedSpriteProperty.Y):
            game.remove_life(1)
            playerSprite.turn(Direction.RIGHT, 180)
            if direction == 1:
                direction = 0
            else:
                direction = 1
        basic.pause(playerSpeed)
    basic.pause(200)
basic.forever(on_forever)
