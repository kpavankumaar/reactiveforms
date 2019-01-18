import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { CustomerComponent } from './customer/customer.component';
import { ReactiveformModule } from './reactiveform/reactiveform.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, ReactiveformModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
