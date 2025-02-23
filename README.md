# Draw & Guess: Real-Time Multiplayer Web Game

A real-time multiplayer game where players take turns drawing prompts on a shared digital canvas, while others guess the drawing within a limited time. The game leverages **Gorilla WebSockets Library** for real-time communication and **HTML Canvas** for drawing.

## Key Features

- **Real-Time Drawing:**  
  Players draw in real-time using the HTML Canvas, with their drawings instantly visible to other players via WebSockets.

- **Prompt System:**  
  Random prompts are generated for each drawing round.

- **Guessing System:**  
  A text box allows other players to guess what’s being drawn. Hints or partial prompts can be optionally displayed as time runs out.

- **Scoring:**  
  Points are awarded for correct guesses and given to the artist if others guess correctly within the time limit.

- **Socket.IO/WebSockets Integration:**  
  Ensures smooth, real-time synchronization of drawing and guessing interactions between all players.

- **User-Friendly Interface:**  
  A minimalist, intuitive UI for both drawing and guessing to keep the game engaging.

## How It Works

1. **Players Join a Lobby** – A Socket.IO server manages player connections and assigns a turn order.
2. **Drawing Phase** – The selected player receives a random prompt and starts drawing while others watch in real-time.
3. **Guessing Phase** – Other players submit guesses via WebSockets, and the game checks for correct answers.
4. **Scoring & Next Round** – Points are awarded, and the next player gets their turn to draw.

## Tech Stack
- **Frontend:** React.js, Canvas API
- **Backend:** Golang, net/http, Gorilla Websockets
- **WebSockets for Real-Time Communication**

## Getting Started
### **Installation**
1. Clone the repository:
   ```sh
   git clone https://github.com/responsetime/canvas-game.git
   cd canvas-game
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. Open the game in a browser at `http://localhost:5173`

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.


