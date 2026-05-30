package models

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	Nickname string
	Conn *websocket.Conn
}

type Room struct {
	Code string
	Text string
	Queue []*Client
	Clients []*Client
	Mu sync.Mutex
}