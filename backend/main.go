package main

import (
	"html/template"
	"log"
	"net/http"
	"time"
)

var templates = template.Must(template.ParseFiles("login.html", "student.html", "tutor.html"))

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		templates.ExecuteTemplate(w, "login.html", nil)
		return
	}
	username := r.FormValue("username")
	role := "student"
	if username == "tutor1" {
		role = "tutor"
	}
	cookie := http.Cookie{
		Name:    "userRole",
		Value:   role,
		Expires: time.Now().Add(30 * time.Minute),
	}
	http.SetCookie(w, &cookie)
	http.Redirect(w, r, "/dashboard", http.StatusSeeOther)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("userRole")
	if err != nil {
		http.Redirect(w, r, "/login", http.StatusSeeOther)
		return
	}
	if cookie.Value == "tutor" {
		templates.ExecuteTemplate(w, "tutor.html", nil)
	} else {
		templates.ExecuteTemplate(w, "student.html", nil)
	}
}

func main() {

	mux := http.NewServeMux()
	mux.HandleFunc("/login", loginHandler)
	mux.HandleFunc("/dashboard", dashboardHandler)

	handler := corsMiddleware(mux)

	log.Println("Server starting on http://localhost:8000")
	if err := http.ListenAndServe(":8000", handler); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
