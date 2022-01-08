import Phaser from 'phaser'

export default class Claw extends Phaser.Scene
{
    numEvos!: number;
    numCoins!: number;
    earnedCoins!: number;
    earnedEvos!: number;

	constructor()
	{
		super('claw')
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
        this.startPopUp();

        //Animal jam style. Assign different probabilities to every item. Draws random item/gives fact and lights up inventory if new.

    }

    update(time: number, delta: number): void 
    {
        
    }
    startPopUp() //Ask if want to spend coins
    {
        //if clicks no button, go home
        
        
        //if clicks yes button, update evos and continue
        
        this.updateEvosCoins();
    }
    updateEvosCoins() //Subtract spent _10_ coins. Localstoraged. 
    {
        var totalEvos = this.numEvos + 50; // Adds evos for learning
        var totalCoins = this.numCoins - 10;

        localStorage.setItem('savedEvos', totalEvos.toString()); 
        localStorage.setItem('savedCoins', totalCoins.toString());

    }
}
