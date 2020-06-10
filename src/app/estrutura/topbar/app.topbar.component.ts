import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['app.topbar.component.css']
})
export class AppTopBarComponent {

    constructor(public app: AppComponent) { }
}
