package main

import (
	"log"
	"net/http"

	"1charteam/handlers"
	"1charteam/models"
)

func main() {
	manager := models.NewManager()

	//rota única:
	http.HandleFunc("/ws", handlers.HandleWebSocket(manager))

	log.Println("Servidor iniciando na porta 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Erro ao iniciar servidor: ", err)
	}
}