# SECRET VOLDEMORT Changelog
## Team : Expecto_Aprobarum
\
All notable changes to this project will be documented in this file.

### [Latest release]

## 30-11-2020
### Added
- Added a button for Death Eater players which, when clicked, shows his Death Eater allies.

### Changed
- Changed styles for players role.
- Changed how messages inside the chat window are displayed.

## 29-11-2020
### Added
- Added the ability for the Headmaster to cast **Expelliarmus** when the requirements are met. The Headmaster has the ability to discard both proclamation cards shown and go to the next turn, only if the Minister agrees with this.
- The **Chaos** counter has been implemented. After three consecutive unsuccessful governments, the next proclamation of the deck is automatically played on the board and a message is shown to every player.

### Fixed
- Dead players are no longer able to send messages in the game chat.

## 28-11-2020
### Added
- Added **Crucio** spell: the Minister is now able to punish a player and discover its loyalty!
- Added an in-game button to show the chat window along with all the messages.

### Changed
- Changed how Divination spell is shown. It now asks the Minister to cast the spell and shows the divination cards for a few seconds. You are no longer able to see the cards throughout the whole next turn.

## 26-11-2020
### Added
- Added game over details to the end game screen. It will now show if the winning team won because of proclamations ammount or *someone important* was killed.
- Added an in-game **chat**. You can now send messages to other players!

### Changed
- Changed the visualization of votes. They will now be shown after the Vote phase and just for 10 seconds.

## 25-11-2020
### Added
- Added **Imperius** spell: the Minister can assign any other alive player to be the next Minister candidate.

### Fixed
- Now you can properly create a game with 5 players again.

## 22-11-2020
### Added
- Now you are able to create games from 5 to 10 players. Depending on the number of chosen players, the rules of the game will also change.
- Added a "Copy to clipboard" button next to the invite URL inside the game lobby.

### Changed
- Changed invite URL style.
- Changed how the players are shown inside the game lobby.

## 21-11-2020
### Changed
- Players which should not be choosable in the Choose headmaster phase are now shown with a different color and are unclickable. 

## 19-11-2020
### Changed
- Alerts are now only closed when the user closes them (they are no longer timed out).

## 16-11-2020
### Added
- Added email verification when registering a new user. An alert will be shown asking for you to verify your email.
- Added a section inside the board which shows the spells that will be played in the game, along with the number of Death Eater proclamations required for them to be cast.
- Added a popup after the Vote phase that shows the new government information.

### Changed
- Changed the names that appear in the player lists (in-game) in order to show the players' alias instead of their username.

### Fixed
- Fixed how the players' government positions are shown inside the game's information section.

## 15-11-2020
### Added
- Added an end of game screen. If a team reaches the required ammount of proclamations to win or Voldemort is killed, the player will be shown a Game Over screen. The screen contains the winning team name and a button to exit the game.
- Added the following in-game alerts:
    - Added an alert when trying to choose an invalid player in the Choose headmaster phase.
    - Added an alert when your vote has been sent succesfuly in the Vote phase.
    - Added an alert if you try to vote more than once in the Vote phase.
- Now everyone's vote is shown to each player on the Vote phase and it is shown until the next turn.

### Changed
- Dead players are shown with a different style in the in-game player list inside the information section.
- Voldemort's role card has been updated.

### Fixed
- Fixed current phase label not showing properly in the information section.

## 14-11-2020
### Added
- Added **Divination** spell: the Minister is now able to take a look at the first three proclamation cards if the requirements are met. They will be shown only to him for the entire next turn.
- Added **Avada Kedavra** spell: the Minister will be able to kill another player if the requirements are met. Try to play carefuly or your time may have come ...
- Added a main page background image.
- Added alerts to the Profile section in case you enter invalid data.
- Added an alert if you try to create an unnamed game.

### Changed
- Changed "Save config" button style when creating a game.

## 10-11-2020
### Added
- The first in-game **board** layout has arrived! It is divided in three spaces: player information (left), board information (top-right) and game phase information (bottom-right).
- Added **Discard card** phase, where the current minister is able to discard one of the three cards given and pass the other two to the current headmaster.

## 10-11-2020
### Added
- Added an **invite URL** to the game lobby. You are now be able to join a game lobby by using this URL too, even if you are not logged in (you will be shown a Login form in order to be able to join)
- You are now able to change your in-game user alias and account password in the new Profile section.

### Changed
- Changed player list style in Choose headmaster phase.

## 8-11-2020
### Added
- Added in-game information to show the player role.

## 6-11-2020
### Added
- Added alerts when trying to submit incorrect values in Login and Register pages.
- Added a notification when trying to start a game without the required number of players inside the game lobby.
- You can no longer join a game if it's full.

### Fixed
- The player list inside the game lobby is no longer changing players positions randomly.
- Now only the game owner can see the "Start game" button.
- Now a player is properly removed from the game when exiting the game lobby.

## 3-11-2020
### Added
- Added a button to exit the game lobby.

### Changed
- Changed Create game and Join game button styles.
- Login and Register pages are now individual pages.

### Fixed
- Fixed the game lobby so that a game cannot be started if less than 5 players have joined.

##  2-11-2020
### Added
- Added a **Choose headmaster** phase, where the current Minister Candidate can choose the next Headmaster Candidate from a list of choosasble players.
- Added a "Join game" button in the main page. It shows a list of available games and the possibility to join one if you click on them.

##  31-10-2020
### Added features
- Added **Register** page. To register a new user it is required to input a username, an email address and a password.
- Added **Login** page. To log in you must input your email and your password.
- Added a **Create game** button in the main page. It allows to create a game of 5 players.
- Added a game lobby that shows a list of players inside the game and a button "Start game" to start playing.
- Added a **Vote** phase where each player can vote whether they approve the new goverment or not.
- Added an **Emit proclamation** phase where the current Headmaster can choose to play between two given proclamations.

[Latest release]: https://github.com/ExpectoAprobarum/FrontendSV/tree/master