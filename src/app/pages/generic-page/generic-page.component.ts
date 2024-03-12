import { Component } from '@angular/core';
import { PageComponent } from '../page.component';
import { NavigationEnd, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-generic-page',
    templateUrl: './generic-page.component.html',
    styleUrls: ['./generic-page.component.scss', '../page.scss']
})
export class GenericPageComponent {

    public url: string = this.router.url.replace(/^\//,"");

    constructor(
        public m: MainService,
        private router: Router
    ) {
        
    }

    async ngOnInit() {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.url = val.url.replace(/^\//,"");;
            }
        });
    
        // Moviment i animació fons //
        // $("body").css({ "background-position": "bottom right" });
    }

}
