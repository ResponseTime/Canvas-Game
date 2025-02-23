package handlers

import (
	"encoding/json"
	"fmt"
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
var connections = make(map[*websocket.Conn]bool)

func CreateParty(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fmt.Println(len(connections))
	fmt.Println(connections)
	for conn, _ := range connections {
		conn.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("Hello ws %p", conn)))
	}

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
func handleConn(conn *websocket.Conn) {
	if conn != nil {
		for {
			_, message, err := conn.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				delete(connections, conn)
				conn.Close()
				break
			}

			for val := range connections {
				if val != conn {
					val.WriteMessage(websocket.TextMessage, message)
				}
			}
		}
	}
}

var done = make(chan bool, 1)

func TestWebsocket(w http.ResponseWriter, r *http.Request) {

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		panic(err)
	}

	if _, ok := connections[conn]; !ok {
		connections[conn] = true
	}
	go handleConn(conn)
}
