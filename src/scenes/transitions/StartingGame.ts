import Phaser from 'phaser'

export default class StartingGame extends Phaser.Scene
{
    gameTitle: any;
    numEvos: any;
    gameKey: any;
    
	constructor()
	{
		super('startingGame')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        //gets data on game selection. 
        this.gameTitle = data.gameTitle; // to be displayed
        this.numEvos = data.evos; // to be passed into the actual game
        this.gameKey = data.gameKey; //to be used to go to actual game
    }

	preload()
    {
       // this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        //creates a popup overlay on home screen, asks if want to play. if play, start game with data
        //uses data to select visuals/text for popup

        var graphics = this.add.graphics();

        graphics.fillStyle(0x000000, 0.85);
        graphics.fillRect(0, 0, 600, 400);
        graphics.fillStyle(0xcc6900, 1);
        graphics.fillRoundedRect(90, 60, 220, 170, 10);
        graphics.fillStyle(0xe79740, 1);
        graphics.fillRoundedRect(90, 60, 15, 170, { tl: 10, tr: 0, bl: 10, br: 0 });
        graphics.fillRoundedRect(300, 60, 15, 170, { tl: 0, tr: 10, bl: 0, br: 10 });
        
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        var title = this.add.bitmapText(screenCenterX, 150, "pixelFont", this.gameTitle, 25);
        title.setOrigin(0.5)
        var flaps = this.add.sprite(202,80, 'flaps', Phaser.Math.Between(0,2))
        flaps.setScale(1.8)

        var play = this.add.sprite(200,180,'playButton', 0)
        play.setInteractive()
        play.on('pointerup',  (pointer) => {
            this.scene.start(this.gameKey, {evos: this.numEvos});
        }, this);
       
        

    }

    update(time: number, delta: number): void 
    {
       
    }
}
