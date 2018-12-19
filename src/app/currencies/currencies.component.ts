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
  newName: String = '';
  newSymbol: String = '';
  editName: String;
  editSymbol: String;
  editId: number;
  deleteName: object;
  deleteId: string;
  error: string;
  nameError: boolean = false;
  symbolError: boolean = false;
  modal: boolean = false;
  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.data.getData().subscribe(data => (this.currencies = data));
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  addCurr() {
    if (this.newName === '' && this.newSymbol === '') {
      this.error = 'Name and Symbol can be empty!';
      this.nameError = true;
    } else if (this.newSymbol === '') {
      this.error = 'Symbol can be empty!';
      this.symbolError = true;
    } else if (this.newName === '') {
      this.error = 'Name can be empty!';
      this.nameError = true;
      this.symbolError = true;
    } else {
      this.data.addData(this.newName, this.newSymbol).subscribe(() => {
        return this.data.getData().subscribe(data => {
          this.newName = "";
          this.newSymbol = "";
          this.nameError = false;
          this.symbolError = false;
          return (this.currencies = data);
        });
      });
    }
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
    if (this.editName === '' && this.editSymbol === '') {
      this.error = 'Name and Symbol cant be empty!';
      this.nameError = true;
    } else if (this.editSymbol === '' || this.editSymbol === null || this.editSymbol === undefined) {
      this.error = 'Symbol cant be empty!';
      this.symbolError = true;
    } else if (this.editName === '') {
      this.error = 'Name cant be empty!';
      this.nameError = true;
      this.symbolError = true;
    } else {
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
  }
  showAddForm() {
    let newValue = !this.addNew;
    this.addNew = newValue;
    this.editItem = false;
  }
  modalSwitch(curr) {
    let current = this.modal;
    this.modal = !current;
    if (this.modal === false) {

      this.deleteName = {
        name: '',
        symbol: ''
      }
      this.deleteId = '';
    } else {
      this.deleteName = {
        name: curr.name,
        symbol: curr.symbol
      }
      this.deleteId = curr.id;
    }


  }
  removeCurr() {
    this.data
      .deleteData(this.deleteId)
      .subscribe(() => {
        this.modal = false;
        this.deleteName = {
          name: '',
          symbol: ''
        }
        return this.data.getData().subscribe(data => (this.currencies = data))
      }

      );
  }
}
