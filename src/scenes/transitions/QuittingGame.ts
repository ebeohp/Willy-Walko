import Phaser from 'phaser'

export default class QuittingGame extends Phaser.Scene
{
    earnedEvos: any;
    currentGameKey: any;
    numEvos: any;
    gameTitle: any;
    currentMusicKey: any;
    
	constructor()
	{
		super('quittingGame')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        //gets data on game selection. 
        this.currentGameKey = data.currentGameKey;
        this.earnedEvos = data.earnedEvos;
        this.numEvos = data.numEvos;
        this.gameTitle = data.gameTitle;
        this.currentMusicKey = data.currentMusicKey;
    }

	preload()
    {
       // this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        //creates a popup overlay on home screen, asks if want to play. if play, start game with data
        //uses data to select visuals/text for popup
        console.log("quit game launched")
        var graphics = this.add.graphics();

        this.add.bitmapText(170,120, "pixelFont", "Quit?", 35);
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, 600, 400);
        graphics.fillStyle(0xcc6900, 1);
        graphics.fillRoundedRect(90, 60, 220, 170, 10);
        graphics.fillStyle(0xe79740, 1);
        graphics.fillRoundedRect(90, 60, 15, 170, { tl: 10, tr: 0, bl: 10, br: 0 });
        graphics.fillRoundedRect(300, 60, 15, 170, { tl: 0, tr: 10, bl: 0, br: 10 });
        var flaps = this.add.sprite(202,80, 'flaps', Phaser.Math.Between(0,2))
        flaps.setScale(1.8)

        var yes = this.add.sprite(150,180,'uiButtons', 0)
        yes.setInteractive().setScale(1.5);
        yes.on('pointerup',  (pointer) => {
            this.scene.stop(this.currentGameKey);
            this.sound.removeByKey(this.currentMusicKey);
            this.scene.start("awardGame", {gameTitle: this.gameTitle, earnedEvos: this.earnedEvos, numEvos: this.numEvos})
        }, this);
        var no = this.add.sprite(250,180,'uiButtons', 1)
        no.setInteractive().setScale(1.5);
        no.on('pointerup',  (pointer) => {
            this.scene.resume(this.currentGameKey);
            this.scene.stop();
        }, this);
        
    }

    update(time: number, delta: number): void 
    {
       
    }
}
