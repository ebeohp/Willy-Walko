import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Title from './scenes/Title'
import Home from './scenes/Home'
import Claw from './scenes/minigames/Claw'
import Trivia from './scenes/minigames/Trivia'
import Atomic from './scenes/minigames/Atomic'
import MicroShip from './scenes/minigames/MicroShip'
import Parkour from './scenes/minigames/Parkour'
import PhilHelios from './scenes/minigames/PhilHelios'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Preloader, Title, Home, Claw, Trivia, Atomic, MicroShip, Parkour, PhilHelios]
}

export default new Phaser.Game(config)
