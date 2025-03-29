package main

import (
	"html/template"
	"net/http"
	"time"
)

var templates = template.Must(template.ParseFiles("login.html", "student.html", "tutor.html"))

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
	http.HandleFunc("/login", loginHandler)
	http.HandleFunc("/dashboard", dashboardHandler)
	http.ListenAndServe(":8000", nil)
}
