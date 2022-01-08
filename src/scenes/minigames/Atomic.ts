import Phaser from 'phaser'

export default class Atomic extends Phaser.Scene
{
    numEvos!: number;
    numCoins!: number;
    earnedCoins=0;
    earnedEvos=0;
    
	constructor()
	{
		super('atomic')
	} 

    init(data) //Gets initial num evos and coins from home
    {
        this.numEvos = data.evos;
        this.numCoins = data.coins;
    }

	preload()
    {
        
    }

    create()
    {
        this.endPopUp();
        
    }

    update(time: number, delta: number): void 
    {
        //If time is up, call endPopUp
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
