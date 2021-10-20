/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

/* I have changed the data type of the variables from string to any as the variables can now
take both string and number. 
1. Calculated the monthly payment by multiplying the loan amount with 2 and dividing the 
answer by 100 in order to get 2% of loan amount.
2. Calculated the late payment by multiplying the monthly payment with 5 and dividing the
answer by 100 in order to get 5% of monthly payment.
3. Used .toLocaleString() in order to display the string in the mentioned format.
4. Displayed the values in template by adding a $ sign.
*/
import { Component,NgModule, OnInit  } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> $ {{monthly_payment}} <br/>
                    <b>Late Payment Fee : $ {{late_payment}}</b> <br/>
                </div>`
})
export class Test01Component implements OnInit{

    loan_amount:number = 1000;
    monthly_payment:any = 200;
    late_payment:any = 10;

    ngOnInit()
    {
        if(this.loan_amount == null || this.loan_amount == 0)
        {
            this.monthly_payment = "N/A";
            this.late_payment = "N/A"
        }
        else
        {
            this.monthly_payment = (this.loan_amount * 2) / 100;
            this.late_payment = (this.monthly_payment * 5) / 100;
            this.monthly_payment = this.monthly_payment.toLocaleString();
            this.late_payment = this.late_payment.toLocaleString();
        }
    }
}

@NgModule({
    imports : [
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}