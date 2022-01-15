import Phaser from 'phaser'

export default class Home extends Phaser.Scene 
//Carnival map. Player can walk around and select games to play. If coming from title screen, give welcome back and spawn at entrance, if from any other scene, fade back in front of og place. 
{
    
    private buttons?: Phaser.Physics.Arcade.Group;
    private goAtomic?: any;
    private goClaw?: any;
    private goMicro?: any;
    private goParkour?: any;
    private goPhil?: any;
    private goTrivia?: any;

    numEvos?: string | number | null;
    numCoins?: string | number | null;
  
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private willy?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private myCam!: Phaser.Cameras.Scene2D.Camera;
    //Scale of all images
    private s = 1;
  private shipcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private philcarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private bountycarn?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    

	constructor()
	{
		super('home')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {   
        

        //Map setup
        var g1 = this.add.grid(150, 200, 480, 320, 32, 32, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();
        g1.setScale(this.s);


        this.shipcarn = this.physics.add.sprite(100,200, 'shipcarn', 0);
        this.shipcarn.anims.play('shipcarn_anim');
        this.philcarn = this.physics.add.sprite(200,200, 'shipcarn', 0);
        this.philcarn.anims.play('philcarn_anim');
        this.bountycarn = this.physics.add.sprite(0,200, 'bountycarn', 0);

        //Player setup
        this.willy = this.physics.add.sprite(50,300,'willy',0);
        this.willy.setScale(this.s);
        this.myCam = this.cameras.main.startFollow(this.willy, true);
        this.willy.setCollideWorldBounds(true);
        //Ease in/out effects later

        //Local storage. May need to restart game instance to update evos after each minigame
        this.numEvos= Number( localStorage.getItem("savedEvos") == null ? 0 : localStorage.getItem("savedEvos"));
        this.numCoins=  Number(localStorage.getItem("savedCoins") == null ? 0 : localStorage.getItem("savedCoins"));
           
        var evoCounter = this.add.bitmapText(35,14, "pixelFont", "X " + this.numEvos, 20);
        var evoimg = this.add.image(20,20,'evoimg');
        var coinCounter = this.add.bitmapText(35,38, "pixelFont", "X " + this.numCoins + " ", 20);
        var coinimg = this.add.image(20,45,'coinimg');
        evoimg.setScrollFactor(0,0);
        coinimg.setScrollFactor(0,0);    
        evoCounter.setScrollFactor(0,0);
        coinCounter.setScrollFactor(0,0);
        
        //Buttons to each minigame ------------------------------------------------------------------------
        this.buttons = this.physics.add.group();

        //this.goAtomic = this.buttons.create(50,50, "level_buttons");
        this.bountycarn.setInteractive().setScale(this.s);;
        this.bountycarn.on('pointerout',  (pointer) => {
          //this.goAtomic.setFrame(0);
        }, this);
        this.bountycarn.on('pointerup',  (pointer) => {
            this.scene.start('atomic', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        this.goClaw = this.buttons.create(100,50, "level_buttons");
        this.goClaw.setInteractive().setScale(this.s);;
        this.goClaw.on('pointerout',  (pointer) => {
          //this.goClaw.setFrame(0);
        }, this);
        this.goClaw.on('pointerup',  (pointer) => {
            this.scene.start('claw', {evos: this.numEvos, coins: this.numCoins});
        }, this);
        
        //this.goMicro = this.buttons.create(150,50, "level_buttons");
        this.shipcarn.setInteractive().setScale(this.s);;
        this.shipcarn.on('pointerout',  (pointer) => {
          //this.goMicro.setFrame(0);
        }, this);
        this.shipcarn.on('pointerup',  (pointer) => {
            this.scene.start('microship', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        this.goParkour = this.buttons.create(200,50, "level_buttons");
        this.goParkour.setInteractive().setScale(this.s);;
        this.goParkour.on('pointerout',  (pointer) => {
          //this.goParkour.setFrame(0);
        }, this);
        this.goParkour.on('pointerup',  (pointer) => {
            this.scene.start('parkour', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        //this.goPhil = this.buttons.create(250,50, "level_buttons");
        this.philcarn.setInteractive().setScale(this.s);;
        this.philcarn.on('pointerout',  (pointer) => {
          //this.goPhil.setFrame(0);
        }, this);
        this.philcarn.on('pointerup',  (pointer) => {
            this.scene.start('philHelios', {evos: this.numEvos, coins: this.numCoins});
        }, this);
        
        this.goTrivia = this.buttons.create(300,50, "level_buttons");
        this.goTrivia.setInteractive().setScale(this.s);;
        this.goTrivia.on('pointerout',  (pointer) => {
          //this.goTrivia.setFrame(0);
        }, this);
        this.goTrivia.on('pointerup',  (pointer) => {
            this.scene.start('trivia', {evos: this.numEvos, coins: this.numCoins});
        }, this);

        
    
        
    
    }
    

    update(time: number, delta: number): void 
    {
        //Player movement
        if(!this.cursors || !this.willy)
        {
            return;
        }
        const speed = 150;
        if(this.cursors.left?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(-speed, 0);
            this.willy.scaleX = this.s
            this.willy.body.offset.x = 32
        }
        else if(this.cursors.right?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(speed, 0);
            this.willy.scaleX = -this.s
            this.willy.body.offset.x = 0
        }
        else if (this.cursors.up?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(0,-speed);
        }
        else if(this.cursors.down?.isDown)
        {
            this.willy.anims.play('willy_walk',true);
            this.willy.setVelocity(0,speed);
        }
        else
        {   
            this.willy.anims.play('willy_idle',true);
            this.willy.setVelocity(0,0);
        }
        //for animations of evolution sprites, have if else inside based on number evos
             
    }
}
