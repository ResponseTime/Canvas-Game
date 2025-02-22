package main

import (
	"fmt"
	"net/http"
	"responsetime/canvas-game-backend/handlers"
)

func main() {
	http.HandleFunc("/ping", handlers.Pong)
	http.HandleFunc("/create-party", handlers.CreateParty)
	http.HandleFunc("/ws", handlers.TestWebsocket)
	fmt.Println("Running Server on 3000")
	http.ListenAndServe(":3000", nil)
}
