import Phaser from 'phaser'

export default class Title extends Phaser.Scene
{
    willy!: Phaser.GameObjects.Sprite;
    spacebar!: Phaser.Input.Keyboard.Key;
	constructor()
	{
		super('title')
	}

	preload()
    {
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    create()
    {
        

        var title = this.add.sprite(220,110,'title',0)
        title.setScale(3)
        var floor = this.add.sprite(200,150,'title',1)
        floor.setScale(3.2)

        this.add.bitmapText(200,150, "pixelFont", "PRESS [SPACE] TO PLAY", 20);
        this.willy = this.add.sprite(100,210,'willy',0);
        this.willy.setScale(3).flipX=true;
    }

    update(time: number, delta: number): void 
    {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.startGame();
           
        }
    }
    startGame()
    {
        this.scene.stop();
        this.scene.start('home');
    }
}
