import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}
  getData() {
    return this.http.get("https://curr-server.herokuapp.com/currencies");
  }
  httpOptions: object = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  addData(name, symbol) {
    return this.http.post(
      "https://curr-server.herokuapp.com/currencies/",
      {
        name: name,
        symbol: symbol
      },
      this.httpOptions
    );
  }
  deleteData(id) {
    return this.http.delete(
      "https://curr-server.herokuapp.com/currencies/" + id
    );
  }
  updateData(id, name, symbol) {
    let obj = {
      name: name,
      symbol: symbol
    };
    return this.http.patch(
      "https://curr-server.herokuapp.com/currencies/" + id,
      obj
    );
  }
}
