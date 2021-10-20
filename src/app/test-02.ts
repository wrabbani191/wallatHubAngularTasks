/**
 * Update the following components to meet the requirements : 
 * * Bind [field] of [textfield] component to its text input
 * * Pass value of [field] from [textfield] component to [title] property of component [ng-app]
 */

/* 
1. Binded the text input to field variable in textfield component.
2. Added ngModelChange that will detect any change that occurs in the field variable.
3. sendItem function will be called when any change occurs in input.
4. The function will emit the value of the field variable to its parent component. 
5. child-component will take the emitted value by calling the function displayValue()
6. displayValue will further emit the value to its parent component.
7. ng-app will take the emitted value and assign it to title
8. It will get displayed due to two way binding
*/
import { Component, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { EventEmitter } from '@angular/core';

@Component({
    selector : 'textfield',
    template : '<input type="text" value="" [(ngModel)] = "field" (ngModelChange) = "sendItem()"/>'
})
export class TextField {
    @Output() eventToEmit = new EventEmitter();
    field: string = "";

    sendItem()
    {
        this.eventToEmit.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title:<h2><br/><textfield (eventToEmit) = "displayValue($event)"></textfield>`
})
export class ChildComponent {
    @Output() eventToEmitTwice = new EventEmitter();

    displayValue(field)
    {
        this.eventToEmitTwice.emit(field);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (eventToEmitTwice) = "getValue($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    getValue(field)
    {
        this.title = field;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};