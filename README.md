# 1CharTeam 🎹

> O editor colaborativo que garante que **todo mundo trabalhe** — um caractere por vez.

Desenvolvido para o **Hackathon de Ideias Inúteis**, o 1CharTeam resolve o eterno problema dos trabalhos em grupo onde só uma pessoa faz tudo. A solução? Simples: cada membro da equipe só pode digitar **um caractere por vez**, em rodízio obrigatório.

---

## Como funciona

1. Um usuário cria uma sala e recebe um **código de 4 dígitos**
2. Compartilha o código com os colegas
3. Cada um entra na sala com seu nickname
4. O sistema define uma fila de rodízio — o primeiro a entrar é o primeiro a digitar
5. Cada vez que alguém digita um caractere, vai para o final da fila
6. Todos veem o documento sendo construído em tempo real

---

## Como rodar localmente

### Backend

```bash
cd 1charteam-back
go mod tidy
go run main.go
```

O servidor sobe em `ws://localhost:8080/ws`

### Frontend

```bash
cd 1charteam-front
npm install
npm start
```

O front sobe em `http://localhost:3000`

---

## Stack

### Frontend
- **React** (Create React App)
- **WebSocket nativo** do browser para comunicação em tempo real

### Backend
- **Go 1.26**
- **Gorilla WebSocket** para gerenciamento de conexões
- Estado mantido **em memória** — sem banco de dados

---

## Estrutura do projeto

```
1charteam-front/
  src/
    pages/
      Home.jsx        # Tela inicial com botões criar/entrar
      Document.jsx    # Tela do editor com o documento em tempo real
    components/
      Modal.jsx       # Modal de criação/entrada de sala
    hooks/
      useWebSocket.js # Hook para gerenciar a conexão WebSocket
    App.js            # Gerenciamento de estado e navegação

1charteam-back/
  main.go             # Ponto de entrada e rotas
  handlers/
    websocket.go      # Lógica de WebSocket, fila e broadcast
  models/
    room.go           # Structs Client e Room
    manager.go        # Gerenciador de salas em memória
```

---

## Protocolo WebSocket

### Mensagens do cliente para o servidor

| type | campos | descrição |
|------|--------|-----------|
| `create` | `nickname` | Cria uma nova sala |
| `join` | `nickname`, `roomCode` | Entra em uma sala existente |
| `char` | `char` | Envia o caractere digitado |

### Mensagens do servidor para o cliente

| type | campos | descrição |
|------|--------|-----------|
| `created` | `text`, `currentTurn`, `roomCode` | Sala criada com sucesso |
| `update` | `text`, `currentTurn`, `roomCode` | Estado atualizado da sala |
| `error` | `message` | Erro (ex: sala não encontrada) |

---

## Decisões de projeto

- **Sem banco de dados** — todo o estado vive em memória. Se o servidor reiniciar, as salas somem. Perfeito para um hackathon.
- **Sem formatação** — apenas texto simples, o que elimina toda a complexidade de algoritmos como CRDT ou Operational Transformation.
- **Fila de rodízio** — quem digita vai para o final da fila. Simples, justo, e impossível de trapacear... tecnicamente.
- **Desconexão** — se um usuário cair, ele é removido da fila automaticamente e precisará entrar novamente com o código.

---

## Backlog (funcionalidades futuras inúteis)

- [ ] Timeout por vez — se demorar demais, perde a vez
- [ ] Migração para HTTP para criação de salas
- [ ] Limpeza automática de salas inativas

---

*Feito com dedicação desnecessária para o Hackathon de Ideias Inúteis* 🏆

## Licença

[WTFPL](http://www.wtfpl.net/) — Do What The F* You Want To Public License.
