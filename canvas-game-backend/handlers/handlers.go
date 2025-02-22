package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"responsetime/canvas-game-backend/models"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func CreateParty(w http.ResponseWriter, r *http.Request) {
	party := models.Party{
		PartyName: "test-party",
		PartyID:   12234,
	}
	response, err := json.Marshal(party)
	if err != nil {
		panic(err)
	}
	w.Write(response)
}

func Pong(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("pong"))
}

func TestWebsocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = conn.WriteMessage(mt, []byte("hello test ws"))
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
