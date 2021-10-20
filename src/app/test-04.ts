/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */

/* 
1. Binded the input with the variable by using ngModel.
2. Added change that will check the input when the user clicks outside of the input.
3. generateUserName() will convert the user entered string to lowercase and add a random
integer.
*/
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <div>
                    <label for = "fname">First Name: </label>
                    <input name = "fname" type = "text" 
                    [(ngModel)] = "firstName" (change) = "generateUserName()">
                    <br/><br/>
                    <label for = "lname">Last Name: </label>
                    <input name = "lname" type = "text" 
                    [(ngModel)] = "lastName" (change) = "generateUserName()">
                    <br/>
                    <p>{{userName}}</p>
                </div>
                `,
    styles : []
})
export class UserNameComponent{
    
    firstName: string;
    lastName: string;
    userName: string;

    generateUserName()
    {
        if(this.firstName.length > 0 && this.lastName.length > 0)
        {
            this.userName = this.firstName.toLowerCase() + '_' + this.lastName.toLowerCase() + '_' + Math.floor(Math.random() * 10);
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};