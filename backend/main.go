package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

var db *sql.DB

// initDB connects to the MySQL database using your DSN.
func initDB() {
	// DSN format: username:password@tcp(host:port)/dbname?parseTime=true
	dsn := "abhishek:abhi@28@tcp(127.0.0.1:3306)/smartstudy?parseTime=true"
	var err error
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error opening DB: ", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal("Error pinging DB: ", err)
	}
	log.Println("Connected to MySQL database!")
}

// loginHandler processes login requests.
// It reads the username from the form data,
// assigns a role ('student' by default, or 'tutor' if username is 'tutor1'),
// sets a cookie with that role,
// and inserts (or updates) the user record in the database.
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		username := r.FormValue("username")
		role := "student"
		if username == "tutor1" {
			role = "tutor"
		}

		// Create and set a cookie to store the user's role
		cookie := http.Cookie{
			Name:    "userRole",
			Value:   role,
			Expires: time.Now().Add(30 * time.Minute),
		}
		http.SetCookie(w, &cookie)

		now := time.Now()
		// Insert a new user or update the role and updated_at if the username already exists.
		query := `
        INSERT INTO users (username, email, password_hash, role, created_at, updated_at)
        VALUES (?, '', '', ?, ?, ?)
        ON DUPLICATE KEY UPDATE role = VALUES(role), updated_at = VALUES(updated_at)`
		_, err := db.Exec(query, username, role, now, now)
		if err != nil {
			log.Println("Database error:", err)
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
		return
	}
	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}

// main initializes the database, sets up CORS, serves static files (React app)
// from the 'dist' folder (located at ../frontend/dist relative to backend),
// and starts the HTTP server.
func main() {
	initDB()

	// Setup CORS to allow requests from the frontend (running on http://localhost:5173)
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
	})

	mux := http.NewServeMux()
	// Serve the static React app from the 'dist' folder in the frontend directory
	mux.Handle("/", http.FileServer(http.Dir("../frontend/dist")))
	// Register the login API endpoint
	mux.HandleFunc("/login", loginHandler)

	// Wrap the mux with the CORS handler
	handler := corsHandler.Handler(mux)

	log.Println("Server starting on http://localhost:8000")
	if err := http.ListenAndServe(":8000", handler); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
