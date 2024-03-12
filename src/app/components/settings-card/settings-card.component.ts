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
            .replaceAll("}", "\n}")
            // .replaceAll(",", ", ")
            // .replaceAll(",", ",\n    ")
            .replaceAll(":", ": ")
            .replaceAll("\"", "")
            .replaceAll("border", "\n    border")
            .replaceAll("width", "\n    width")
            .replaceAll("sections", "\n    sections")
    }

    textareaModificat() {
        this.m.nt_settings.sectionsString = this.m.nt_settings.sectionsString
            .replaceAll(",", " , ")
            .replace(/\s\s+/g, " ")
            .replaceAll(" ,", ",")
            .replace(/,,+/g, ",")
            .trim()
            .replace(/,$/, "")
            .toLowerCase();
        
        this.m.nt_settings.sections = this.m.nt_settings.sectionsString.toLowerCase().split(", ");
    }

    closeClick($event) {
        this.mostrat = false;
        $event.stopPropagation();
        console.log(this.m.nt_settings);
        
    }
}
