import Phaser from 'phaser'

export default class AwardGame extends Phaser.Scene
{
    gameTitle: any;
    earnedEvos: any;
    numEvos: any;
    
	constructor()
	{
		super('awardGame')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        //gets data on game selection. 
        this.gameTitle = data.gameTitle; // to be displayed
        this.earnedEvos = data.earnedEvos; // to be passed into the actual game
        this.numEvos = data.numEvos;
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
        var title = this.add.bitmapText(screenCenterX, 130, "pixelFont", this.gameTitle, 25);
        title.setOrigin(0.5)
        var flaps = this.add.sprite(202,80, 'flaps', Phaser.Math.Between(0,2))
        flaps.setScale(1.8)

        this.add.bitmapText(200,140, "pixelFont", "+ " + this.earnedEvos, 30);
        var evoimg = this.add.image(180, 148, 'evoimg')
        
        var tween = this.tweens.add({
            targets: evoimg,
            scale: 1.5,
            ease: "Power1",
            duration: 200,
            repeat: this.earnedEvos,
            onComplete: function(){
                evoimg.setScale(1);
                //plays a ding! sound
            },
            callbackScope: this
        });

        this.updateStorageEvos();

        var gotit = this.add.sprite(200,180,'playButton', 0)
        gotit.setInteractive()
        gotit.on('pointerup',  (pointer) => {
            this.scene.start('home');
        }, this);
       
        

    }
    updateStorageEvos() //Add won evos and evos given from home. Localstoraged
    {
        var totalEvos = this.numEvos+this.earnedEvos;

        localStorage.setItem('savedEvos', totalEvos.toString()); 
        //this.scene.start('home');
    }

    update(time: number, delta: number): void 
    {
       
    }
}
