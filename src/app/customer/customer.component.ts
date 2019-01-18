import { Component, OnInit } from "@angular/core";

@Component({
    selector:'app-customercomponent',
    templateUrl:'customer.component.html'
    // template:`<h2>hello world</h2>`
})
export class CustomerComponent implements OnInit{
    customerComponentInfo:string = 'value assigned outside the constructor and ngoninit fn';
    constructor(){
        // this.customerComponentInfo = 'constructor of customer component';
        console.log(this.customerComponentInfo);
    }
    ngOnInit(){
        this.customerComponentInfo = 'ngOninit of customer component';
        console.log(this.customerComponentInfo);
    }
}