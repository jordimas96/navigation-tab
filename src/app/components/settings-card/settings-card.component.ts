import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-settings-card',
    templateUrl: './settings-card.component.html',
    styleUrl: './settings-card.component.scss'
})
export class SettingsCardComponent {

    public mostrat = false;

    constructor(public m: MainService) { }

    printSettings() {
        return JSON.stringify(this.m.nt_settings)
            .replaceAll("{", "{\n    ")
            .replaceAll("}", "\n}")
            .replaceAll(",", ",\n    ")
            .replaceAll(":", ": ")
            .replaceAll("\"", "")
    }
}
