package main

import (
  "log"
  "net/http"
  "os"
)

func main () {
  fs := http.FileServer(http.Dir("dist"));
  http.Handle("/", fs);


  port := os.Getenv("PORT");

  if (port == "") {
    port = "3000";
  }

  log.Println("Listening... on port " + port);

  http.ListenAndServe(":" + port, nil);
}
