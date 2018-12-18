import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-currencies",
  templateUrl: "./currencies.component.html",
  styleUrls: ["./currencies.component.scss"]
})
export class CurrenciesComponent implements OnInit {
  currencies: object;
  addNew: boolean = false;
  editItem: boolean = false;
  selectedItem: any = "";
  newName: String;
  newSymbol: String;
  editName: String;
  editSymbol: String;
  editId: number;
  constructor(private data: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.data.getData().subscribe(data => (this.currencies = data));
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  addCurr() {
    this.data.addData(this.newName, this.newSymbol).subscribe(() => {
      return this.data.getData().subscribe(data => {
        this.newName = "";
        this.newSymbol = "";
        return (this.currencies = data);
      });
    });
    console.log(this.newName, this.newSymbol);
  }

  onSubmit() {
    console.warn(this.newName);
  }
  hideEditForm() {
    this.editItem = false;
  }

  editCurr(curr) {
    this.editItem = true;
    this.addNew = false;
    this.editName = curr.name;
    this.editSymbol = curr.symbol;
    this.editId = curr.id;
  }
  submitEdit() {
    this.data
      .updateData(this.editId, this.editName, this.editSymbol)
      .subscribe(() => {
        return this.data.getData().subscribe(data => {
          this.editItem = false;
          this.editName = "";
          this.editSymbol = "";
          this.editId = null;
          return (this.currencies = data);
        });
      });
  }
  showAddForm() {
    let newValue = !this.addNew;
    this.addNew = newValue;
    this.editItem = false;
  }
  removeCurr(id) {
    this.data
      .deleteData(id)
      .subscribe(() =>
        this.data.getData().subscribe(data => (this.currencies = data))
      );
  }
}
