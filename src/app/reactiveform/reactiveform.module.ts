import { NgModule } from "@angular/core";
import { ReactiveformComponent } from "./reactiveform.component";
import { CustomerComponent } from "../customer/customer.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[ReactiveformComponent, CustomerComponent],
    imports:[CommonModule, ReactiveFormsModule],
    exports:[ReactiveformComponent]
})
export class ReactiveformModule{

}