# Pong Game

A classic Pong game built with HTML5, CSS3, and vanilla JavaScript. Play against the computer with your mouse or arrow keys!

## Features

✨ **Game Features:**
- **Player vs Computer**: Control the left paddle and compete against an AI opponent
- **Dual Controls**: Use your mouse or arrow keys (↑↓) to move the paddle
- **Bouncing Ball**: Dynamic ball physics with collision detection
- **Paddle Spin**: Ball velocity changes based on where it hits the paddle
- **Scoreboard**: Real-time score tracking for both player and computer
- **Wall Collision**: Ball bounces off top and bottom walls
- **Paddle Collision**: Precise collision detection for paddles
- **Reset Function**: Clear scores and start fresh

## How to Play

1. **Open the game**: Open `index.html` in your web browser
2. **Start**: Click the "Start Game" button to begin
3. **Move the Paddle**: 
   - Use the **Up/Down Arrow Keys** to move the left paddle
   - Or move your **Mouse** to control the paddle position
4. **Score Points**: Prevent the ball from passing your paddle, and try to get it past the computer's paddle
5. **Reset**: Click "Reset Score" to clear scores and start a new game

## Controls

- **Arrow Up (↑)**: Move paddle up
- **Arrow Down (↓)**: Move paddle down
- **Mouse Movement**: Move paddle up/down (paddle follows mouse Y position)
- **Start Button**: Begin the game
- **Reset Button**: Reset scores to 0-0

## Game Mechanics

### Ball Physics
- Ball moves at constant speed with direction changes on collision
- Bounces off top and bottom walls
- Bounces off both paddles with added spin based on impact location
- Resets to center when it passes either paddle (scoring occurs)

### Paddle AI
- Computer paddle tracks the ball's Y position
- Adjusts speed to challenge the player without being impossible to beat
- Stays within game boundaries

### Scoring
- **Player scores**: When ball passes the computer's paddle (right side)
- **Computer scores**: When ball passes the player's paddle (left side)

## File Structure

```
pong-game/
├── index.html       # Game HTML structure
├── styles.css       # Game styling and animations
├── game.js          # Game logic and physics
└── README.md        # This file
```

## Technologies Used

- **HTML5**: Canvas for rendering
- **CSS3**: Styling, gradients, shadows, and responsive design
- **JavaScript**: Game logic, physics, and AI
- **Canvas API**: 2D graphics and animation
- **RequestAnimationFrame**: Smooth game loop

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 Flexbox

## Customization

You can easily customize the game by modifying values in `game.js`:

- `player.speed`: Player paddle movement speed (default: 6)
- `computer.speed`: Computer paddle movement speed (default: 4.5)
- `ball.speed`: Initial ball speed (default: 6)
- Canvas dimensions in `index.html`: `width="1000" height="600"`

## License

Free to use and modify for personal and educational purposes.

## Enjoy!

Have fun playing Pong! Challenge yourself to beat the computer AI. 🎮