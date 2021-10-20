/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */

/*
1. Used the regular expressions to validate the email and password.
2. Added two *ngIf in order to display the two error messages.
3. Since, @angular/forms are not be used, I used @ViewChild() in order to reference the 
HTML element with the TS.
4. ValidateInput gets called when user tries to submit the form which will validate the 
form and display the error.
5. Incase, both email and password are incorrect, it will show the email as incorrect only
according to the flags added in the function. 
*/
import { Component, ElementRef, NgModule, ViewChild  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input #email
                    pattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    type="email" value=""
                    name="email"/>
                    <br/>
                    <p *ngIf = "emailError">Invalid Email</p>
                    <input #password
                    pattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" 
                    type="password" value="" 
                    name="password"/>
                    <p *ngIf = "passwordError">Invalid Password</p>
                    <button type="button" (click) = "validateInput()">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    //not importing @angular/forms does not allow the use of ngModel
    @ViewChild('email', {static: false}) email: ElementRef;
    @ViewChild('password', {static: false}) password: ElementRef;

    emailError: boolean = false;
    passwordError: boolean = false;

    logged_in = false;

    validateInput()
    {
       this.emailError = false;
       this.passwordError = false;
       if(this.email.nativeElement.validity.valid)
       {
           if(this.password.nativeElement.validity.valid)
           {
                this.logged_in = true;
           }
           else
           {
                this.passwordError = true;
           }
       }
       else
       {
           this.emailError = true;
       }
    }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};