package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"1charteam/models"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Type string `json:"type"`
	Nickname string `json:"nickname"`
	RoomCode string `json:"roomCode"`
	Char string `json:"char"`
}

type BroadcastMessage struct {
	Type string `json:"type"`
	Text string `json:"text"`
	CurrentTurn string `json:"currentTurn"`
	RoomCode string `json:"roomCode"`
}

func HandleWebSocket(manager *models.Manager) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err!=nil {
			log.Println("Erro ao fazer upgrade:", err)
			return
		}

		var room *models.Room
		client := &models.Client{Conn: conn}

		defer func() {
			if room != nil {
				removeClient(room, client)
				broadcast(room)
			}
			conn.Close()
		}()

		for {
			_, msgBytes, err := conn.ReadMessage()
			if err != nil {
				log.Println("Cliente desconectado:", err)
				break
			}

			var msg Message
			if err := json.Unmarshal(msgBytes, &msg); err != nil {
				log.Println("Erro ao ler mensagem", err)
				continue
			}

			log.Println("Mensagem recebida:", msg)

			switch msg.Type {
			case "create":
				room = manager.CreateRoom()
				client.Nickname = msg.Nickname
				room.Mu.Lock()
				room.Clients = append(room.Clients, client)
				room.Queue = append(room.Queue, client)
				room.Mu.Unlock()
				log.Println("Sala criada:", room.Code)
				err := conn.WriteJSON(BroadcastMessage{
					Type:        "created",
					Text:        room.Text,
					CurrentTurn: room.Queue[0].Nickname,
					RoomCode:    room.Code,
				})
				log.Println("Erro ao enviar:", err)

			case "join":
				r, exists := manager.GetRoom(msg.RoomCode)
				if !exists {
					conn.WriteJSON(map[string]string{"type": "error", "message": "Sala não encontrada."})
					continue
				}
				room = r
				client.Nickname = msg.Nickname
				room.Mu.Lock()
				room.Clients = append(room.Clients, client)
				room.Queue = append(room.Queue, client)
				room.Mu.Unlock()
				broadcast(room)

			case "char":
				if room == nil {
					continue
				}
				room.Mu.Lock()
				if len(room.Queue) > 0 && room.Queue[0].Nickname == client.Nickname {
					room.Text += msg.Char
					first := room.Queue[0]
					room.Queue = append(room.Queue[1:], first)
				}
				room.Mu.Unlock()
				broadcast(room)
			}
		}
	}
}

func broadcast(room *models.Room) {
	room.Mu.Lock()
	defer room.Mu.Unlock()

	currentTurn := ""
	if len(room.Queue) > 0 {
		currentTurn = room.Queue[0].Nickname
	}

	msg := BroadcastMessage{
		Type: "update",
		Text: room.Text,
		CurrentTurn: currentTurn,
		RoomCode: room.Code,
	}

	for _, c := range room.Clients {
		c.Conn.WriteJSON(msg)
	}
}

func removeClient(room *models.Room, client *models.Client) {
	room.Mu.Lock()
	defer room.Mu.Unlock()

	newClients := []*models.Client{}
	for _, c := range room.Clients {
		if c != client {
			newClients = append(newClients, c)
		}
	}
	room.Clients = newClients

	newQueue := []*models.Client{}
	for _, c := range room.Queue {
		if c != client {
			newQueue = append(newQueue, c)
		}
	}
	room.Queue = newQueue
}