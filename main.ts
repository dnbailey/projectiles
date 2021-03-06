//  This creates the enemies
//  Shoot Projectiles
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function on_player1_button_a_pressed() {
    
    projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . 2 2 . . . . . . . 
                    . . . . . . . 4 5 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        `, starship, 50, 0)
})
//  Blow Up the Rock When Projectile Hits It
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(1)
    if (info.score() % 10 == 0) {
        if (info.score() < 5) {
            info.changeLifeBy(1)
        }
        
    }
    
})
//  Lose a Life When You Hit a Rock
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
})
let enemy : Sprite = null
let projectile : Sprite = null
let starship : Sprite = null
//  Setup Lives and Score
info.setScore(0)
info.setLife(3)
//  Setup Player
starship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . 2 . . . . . . . . . . . . . 
            . . 2 2 . . . . . . . . . . . . 
            . . 2 2 2 . . . . . . . . . . . 
            . . 2 2 2 2 2 2 2 2 2 2 9 9 . . 
            . 4 4 2 2 2 2 2 2 2 2 2 2 2 2 . 
            . 4 4 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . . . . 4 2 2 2 2 . . . . . . . 
            . . . 4 4 2 2 2 . . . . . . . . 
            . . 4 4 2 2 2 . . . . . . . . . 
            . 4 4 2 2 2 . . . . . . . . . . 
            4 4 2 2 2 . . . . . . . . . . . 
            2 2 2 . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . .
    `, 0)
starship.setPosition(20, scene.screenHeight() / 2)
starship.setFlag(SpriteFlag.StayInScreen, true)
starship.setKind(SpriteKind.Player)
//  Setup Controls
controller.moveSprite(starship, 200, 200)
//  Generate Enemies
game.onUpdateInterval(750, function on_update_interval() {
    
    enemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . b b c . . . . . . . 
                    . . . . . c c c . c c . . . . . 
                    . . . . . c c c c . c c c . . . 
                    . . . . c . b c . . . c . . . . 
                    . . . c c . c b c c c c c . . . 
                    . . . c c . c b b c c b b . . . 
                    . . . . b b . . c c . c . . . . 
                    . . . . . b b c c c . c . . . . 
                    . . . . . . . c c b b . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . .
        `, 0)
    enemy.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    enemy.setVelocity(-50, 0)
    enemy.setKind(SpriteKind.Enemy)
})
