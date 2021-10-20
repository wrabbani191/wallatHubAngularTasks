/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */

/* 
1. Changed the ngAfterViewInit to ngAfterContentInit as the change was taking place after
the view had been rendered.
2. Unsubscribed the observable as the memory leak was happening due to this.
*/
import { Component, NgModule, Injectable, Input, OnInit, OnDestroy, AfterContentInit  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent implements OnInit, OnDestroy{
    test:string = null;

    constructor(private _srv:TestService) {

    }

    ngOnInit() {
        
        this._srv.test.subscribe(test=>{
            this.test = test;
        });
    }

    ngOnDestroy()
    {
        this._srv.test.unsubscribe();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent implements AfterContentInit{
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }

    ngAfterContentInit() {
        if(this.skip) this._srv.SetTest("angular test #6");
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};