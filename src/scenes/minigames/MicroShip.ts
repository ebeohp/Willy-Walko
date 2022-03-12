import Phaser from 'phaser'

export default class MicroShip extends Phaser.Scene
{
    numEvos!: number;
    numCoins!: number;
    earnedCoins=0;
    earnedEvos=0;
    ship!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    myCam!: Phaser.Cameras.Scene2D.Camera;
    mito!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    er!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    golgi!: any;
    vacuole!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    lyso!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    ribo!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    organelleArray!: any[];
    
	constructor()
	{
		super('microship')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
        this.numCoins = data.coins;
    }

	preload()
    {
       // this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() //block out bg with graphics. do as little art as possible
    {
       
        //just have a rectangle in bg that changes colors based on waves.
        var r1 = this.add.circle(0, 0, 450, 0xe1e2ed,0.5);
        r1.setStrokeStyle(4, 0xefc53f);
        var r2 = this.add.circle(0, 0, 200, 0x9966ff);
        r2.setStrokeStyle(4, 0xefc53f);

        this.ship = this.physics.add.sprite(0,-250,'ship',0); //0,-220

        this.myCam = this.cameras.main.startFollow(this.ship, true);


        //bit boring, add some tweening/floaty effect
        this.mito = this.physics.add.sprite(250,-250,'mito',0);
        this.er = this.physics.add.sprite(230,0,'er',0);
        this.er.angle = 90
        this.golgi = this.physics.add.sprite(-180,-300,'golgi',0);
        this.golgi.angle = -20;
        this.vacuole = this.physics.add.sprite(-300, 200,'vacuole',0);
        this.lyso = this.physics.add.sprite(380,-50,'lyso',0);
        this.ribo = this.physics.add.sprite(50, 280,'ribo',0);
        this.organelleArray = [this.mito, this.er, this.golgi, this.vacuole, this.lyso, this.ribo];
    
        
        //Decoration change depth soon
        var dec1 = this.physics.add.sprite(-280,-100,'mito',0);
        dec1.setScale(0.8).setAlpha(0.3).flipX = true;
        var dec2 = this.add.sprite(300,280,'mito',0);
        dec2.setAlpha(0.3).setScale(0.8)
        var dec3 = this.add.sprite(150,350,'lyso',0);
        dec3.setAlpha(0.3).setScale(0.8).angle = -20
        var dec4 = this.add.sprite(-350,100,'lyso',0);
        dec4.setAlpha(0.3).setScale(0.8).angle = 90
        var dec5 = this.add.sprite(-190,150,'er',0);
        dec5.setAlpha(0.3).setScale(2).angle = -130
        var dec6 = this.add.sprite(180,-300,'golgi',0);
        dec6.setAlpha(0.3).setScale(0.8).angle = 20
        var dec7 = this.add.sprite(180, 280,'golgi',0);
        dec7.setAlpha(0.3).setScale(0.8).angle = 160
        var dec8 = this.add.sprite(0, -250,'vacuole',0);
        dec8.setAlpha(0.3).setScale(0.8)
        var dec9 = this.add.sprite(50, -350,'ribo',0);
        dec9.setAlpha(0.3).setScale(0.8)
    }

    update(time: number, delta: number): void 
    {
        
       
    }
    endPopUp() //After winning, determine number of evos and coins won
    {
        this.earnedEvos = 1;
        this.earnedCoins = 1;
        this.add.bitmapText(150,80, "pixelFont", "Evos Restored: " + this.earnedEvos, 40);
        this.add.bitmapText(150,100, "pixelFont", "Coins Restored: " + this.earnedCoins, 40);

        this.updateEvosCoins();
    }
    updateEvosCoins() //Add won evos and coins given from home. Localstoraged
    {
        var totalEvos = this.numEvos+this.earnedEvos;
        var totalCoins = this.numCoins+this.earnedCoins;

        localStorage.setItem('savedEvos', totalEvos.toString()); 
        localStorage.setItem('savedCoins', totalCoins.toString());
        this.scene.start('home');
    }
}
