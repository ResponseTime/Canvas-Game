package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	})
	fmt.Println("Running Server on 3000")
	http.ListenAndServe(":3000", nil)
}
