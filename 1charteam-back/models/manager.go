package models

import (
	"math/rand"
	"sync"
	"fmt"
)

// Manager é um singleton que fica na memória e guarda todas as salas ativas
type Manager struct {
	Rooms map[string]*Room
	Mu sync.Mutex
}

// NewManager função construtora
func NewManager() *Manager {
	return &Manager{
		Rooms: make(map[string]*Room),
	}
}

func (m *Manager) CreateRoom() *Room{
	m.Mu.Lock()
	defer m.Mu.Unlock()

	//gera o código aleatório de 4 digitos
	code := fmt.Sprintf("%04d", rand.Intn(10000))
	room := &Room{
		Code: code,
		Text: "",
		Queue: []*Client{},
		Clients: []*Client{},
	}

	// registra a sala
	m.Rooms[code] = room
	return room
}

// busca a sala pelo código
func (m *Manager) GetRoom(code string) (*Room, bool) {
	m.Mu.Lock()

	//defer garante que o Mutex sempre seja liberado quando a função terminar, mesmo com erro.
	defer m.Mu.Unlock()

	room, exists := m.Rooms[code]
	return room, exists
}

