# This creates the enemies
# Shoot Projectiles

def on_player1_button_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        starship,
        50,
        0)
controller.player1.on_button_event(ControllerButton.A,
    ControllerButtonEvent.PRESSED,
    on_player1_button_a_pressed)

# Blow Up the Rock When Projectile Hits It

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.change_score_by(1)
    if info.score() % 10 == 0:
        if info.score() < 5:
            info.change_life_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

# Lose a Life When You Hit a Rock

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy(effects.fire, 100)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

enemy: Sprite = None
projectile: Sprite = None
starship: Sprite = None
# Setup Lives and Score
info.set_score(0)
info.set_life(3)
# Setup Player
starship = sprites.create(img("""
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
    """),
    0)
starship.set_position(20, scene.screen_height() / 2)
starship.set_flag(SpriteFlag.STAY_IN_SCREEN, True)
starship.set_kind(SpriteKind.player)
# Setup Controls
controller.move_sprite(starship, 200, 200)
# Generate Enemies

def on_update_interval():
    global enemy
    enemy = sprites.create(img("""
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
        """),
        0)
    enemy.set_position(scene.screen_width(), randint(0, scene.screen_height()))
    enemy.set_velocity(-50, 0)
    enemy.set_kind(SpriteKind.enemy)
game.on_update_interval(750, on_update_interval)
