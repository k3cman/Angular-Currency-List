import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CurrenciesComponent } from "./currencies/currencies.component";
import { DataService } from "./data.service";

@NgModule({
  declarations: [AppComponent, CurrenciesComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
