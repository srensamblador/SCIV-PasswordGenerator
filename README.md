# Super Castlevania IV - Password Generator
[Website](https://srensamblador.github.io/SCIV-PasswordGenerator/)

## What is Super Castlevania IV?
Super Castlevania IV is a 1991 game developed by Konami for the Super Nintendo Entertainment System (SNES) and the fourth entry in the mainline Castlevania
series. It is a reimagining of the original Castlevania for the NES. 
It is also a lot of fun.

## So, what's this about passwords?
SCIV, as many games of its time, didn't have a save system because of hardware limitations. A common workaround was the use of passwords, inputs the player could introduce in order to continue from a certain point of the game. Passwords are not true saves, that is, they don't reflect the state of the player when he reached that checkpoint, but instead they would start the game at a fixed stage with a default loadout.

## Super Castlevania IV passwords
In SCIV a password it's not a simple string of characters, but a 4x4 grid with symbols (an axe, a bottle of holy water, a heart or nothing).
Each password would load the game in a different stage.

However, there was not a unique password for each stage. Instead, the password algorithm takes into account the name given by the player when he or she started the game. Therefore, each possible name might have a different password set.


Example of a password:  
![Stage 1 password for the player name SIMON](img/password_example.jpg)  


Furthermore, in SCIV when you beat the game, you inmediately start the game in a harder difficulty. This is what is known as the Second Quest (the First Quest would be the base game). This mode includes the password system and as a result, the algorithm takes the difficulty into account. Thus, each player name doesn't have one but two passwords sets, one for each difficulty.

This generator allows the user to input a player name and generates the passwords for all stages of both the First and Second Quest.

## Useful links
* [TFG's Password generator](https://www.romhacking.net/utilities/577/): A command line generator that was able to output the passwords for the First Quest. It laid the groundwork and made much easier to figure out where to look in the game's code.
* [BSNES-plus](http://bsnes.revenant1.net/): An SNES emulator with debugging tools.
* [SNES assembly instruction set](https://wiki.superfamicom.org/65816-reference)


