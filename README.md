#  Know Everything

> Your all-knowing AI companion — powered by **Java Spring Boot** + **React (Vite)** + **Ollama (local AI, FREE)**

---

##  Architecture

```
Browser (React + Vite)
       ↓  HTTP  (port 5173 → proxy → 8080)
Java Spring Boot API  (port 8080)
       ↓  HTTP
Ollama Local AI       (port 11434)
       ↓
llama3.2 / mistral / any model
```

---

##  Prerequisites

Install these first:

| Tool | Download |
|------|----------|
| Java 17+ | https://adoptium.net |
| Maven 3.8+ | https://maven.apache.org |
| Node.js 18+ | https://nodejs.org |
| Ollama | https://ollama.com |

---

## Step-by-Step Setup

### Step 1 — Install & Start Ollama

```bash
# Install Ollama from https://ollama.com
# Then pull a model (choose one):

ollama pull llama3.2        # Recommended (fast, smart)
ollama pull mistral         # Alternative (very capable)
ollama pull llama3.1        # Larger, more powerful

# Start Ollama server
ollama serve
```

Ollama runs at: http://localhost:11434

### Step 2 — Start the Spring Boot Backend

```bash
cd know-everything/backend

# Run the API
mvn spring-boot:run
```

Backend starts at: http://localhost:8080

You can verify it works:
```bash
curl http://localhost:8080/api/v1/health
```

Expected response:
```json
{
  "status": "UP",
  "api": "UP",
  "ollama": "UP",
  "model": "llama3.2",
  "message": "Know Everything API is fully operational!"
}
```

### Step 3 — Start the React Frontend

```bash
cd know-everything/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend starts at: http://localhost:5173

---

##  Open the Website

Open your browser and go to:

```
http://localhost:5173
```

---

##  Change the AI Model

Edit `backend/src/main/resources/application.properties`:

```properties
# Change this to any model you have pulled with ollama
ollama.model=llama3.2
# ollama.model=mistral
# ollama.model=llama3.1
# ollama.model=codellama   # Great for coding!
# ollama.model=phi3        # Lightweight and fast
```

Then restart the backend: `mvn spring-boot:run`

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/chat` | Send a message, get AI response |
| `GET`  | `/api/v1/health` | Check if Ollama is running |
| `GET`  | `/api/v1/categories` | List all knowledge categories |
| `GET`  | `/api/v1/history?category=medical` | Get chat history |
| `GET`  | `/api/v1/stats` | Usage statistics |

### Example Chat Request

```bash
curl -X POST http://localhost:8080/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is diabetes?",
    "category": "medical",
    "history": []
  }'
```

---

##  Knowledge Categories

| ID | Category | Examples |
|----|----------|---------|
| `general` | Ask Anything | Any question |
| `medical` | Medical & Health | Symptoms, medicines |
| `technology` | All Technologies | MERN, Spring Boot, DevOps |
| `code` | Write Code | Java, Python, JS, C++ |
| `website` | Build Website/App | Full stack apps |
| `books` | Books & Literature | Summaries, authors |
| `language` | All Languages | Translate, teach |
| `law` | Legal & Rights | Indian law, rights |
| `finance` | Finance & Money | Stocks, budgeting |
| `science` | Science | Physics, chemistry, bio |
| `history` | History | World + Indian history |
| `medical_advanced` | Advanced Medicine | Drug interactions, diagnostics |

---

##  Database (H2 — Built-in)

Chat history is automatically saved. View it at:
```
http://localhost:8080/h2-console
JDBC URL: jdbc:h2:file:./data/knoweverything
Username: sa
Password: (leave empty)
```

---

##  Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/know-everything-api-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
# Output in: frontend/dist/
```

---

##  Project Structure

```
know-everything/
├── backend/                          ← Java Spring Boot
│   ├── pom.xml
│   └── src/main/java/com/knoweverything/
│       ├── KnowEverythingApplication.java
│       ├── config/
│       │   ├── CorsConfig.java
│       │   └── OllamaConfig.java
│       ├── controller/
│       │   └── ChatController.java   ← REST API endpoints
│       ├── service/
│       │   ├── ChatService.java      ← Business logic
│       │   ├── OllamaService.java    ← Talks to Ollama
│       │   ├── SystemPromptService.java ← AI personalities
│       │   └── ChatHistoryRepository.java
│       └── model/
│           ├── ChatRequest.java
│           ├── ChatResponse.java
│           ├── ChatHistory.java      ← JPA entity
│           └── OllamaRequest.java
│
└── frontend/                         ← React + Vite
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx                   ← Routing
        ├── main.jsx
        ├── index.css
        ├── assets/
        │   └── categories.js        ← All 12 categories
        ├── hooks/
        │   ├── api.js               ← Axios API client
        │   └── useChat.js           ← Chat state management
        ├── components/
        │   ├── ChatMessage.jsx      ← Markdown message renderer
        │   └── ChatInput.jsx        ← Input with send button
        └── pages/
            ├── HomePage.jsx         ← Category grid
            └── ChatPage.jsx         ← Full chat interface
```

---

##  Troubleshooting

**"Ollama is DOWN" error?**
```bash
ollama serve       # Start Ollama
ollama list        # Check if model is downloaded
ollama pull llama3.2  # Pull model if missing
```

**Backend won't start?**
```bash
java -version      # Must be 17+
mvn -version       # Must be 3.8+
```

**Frontend npm error?**
```bash
node -version      # Must be 18+
npm install        # Reinstall dependencies
```
