import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
    template: '',
    styleUrls: ['./page.scss']
})
export class PageComponent {
    
    constructor(public m: MainService) {
        
    }

    async ngOnInit() {
        this.m.afterRootFadeIn(this.afterRootFadeIn.bind(this));
    }

    afterRootFadeIn() { }

}
