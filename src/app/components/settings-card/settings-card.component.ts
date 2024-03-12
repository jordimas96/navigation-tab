import { Component } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Utils } from 'src/app/shared/utils';

@Component({
    selector: 'app-settings-card',
    templateUrl: './settings-card.component.html',
    styleUrl: './settings-card.component.scss'
})
export class SettingsCardComponent {

    public mostrat = false;

    constructor(public m: MainService) { }

    ngOnInit() {
        setTimeout(() => {
            this.m.appbar.setDarkMode();
        }, 5000);

        // Mostrar boto Dark Mode Auto si cal //
        if (Utils.hasCookie("darkmode")) $(".botoAutoMode").fadeIn(150);
    }

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

    // Dark mode //
    async animacioDarkMode(numBoto) {
        // Sistema antic sense cortina //
        // $("*").css("transition", "background-color 0.3s linear, color 0.3s linear, border-color 0.3s linear, filter 0.3s linear");
        // if (numBoto == "dark") this.accioDarkMode();
        // if (numBoto == "auto") this.accioAutoDarkMode();
        // await Utils.wait(600);
        // $("*").css("transition", "");
        // return;



        // Si es click al auto i no cal fer efecte, no el fem //
        if (numBoto == "auto" && this.m.modeFosc == Utils.systemDarkMode()) {
            this.accioAutoDarkMode();
            $(".botoAutoMode").fadeOut(200);
            return;
        }

        // Variables //
        let spread = Utils.mesGran(window.innerWidth, window.innerHeight);
        let blur = 500;
        var color = this.m.modeFosc ? "var(--color-clar)" : "var(--color-fosc)";


        // Transicions //
        $("*:not(.botoDarkMode)").css("transition", "none");

        $(".botoDarkMode, .botoAutoMode").prop("disabled", true);

        // Colocar shadow al primer punt //
        $(".botoDarkMode").css({
            "z-index": "1100",
            "box-shadow": `0 0 0 0 ${color}`
        });
        
        await Utils.wait(0);

        // 1. Transicio spread, expandir //
        $(".botoDarkMode")
            .addClass("transicio-1")
            .css({
                "box-shadow": `0 0 ${blur}px ${spread}px ${color}`
            });

        
        
        
        await Utils.wait(400);
        
        // Acció canviar mode (instantani) //
        if (numBoto == "dark") {
            this.accioDarkMode();
            $(".botoAutoMode").show();
        }
        if (numBoto == "auto") {
            this.accioAutoDarkMode();
            $(".botoAutoMode").hide();
        }

        $(".botoDarkMode").removeClass("transicio-1");
        $(".botoDarkMode").css({ "box-shadow": `100vw 100vh ${blur}px ${spread*1.15}px ${color}` });
        
        await Utils.wait(0);

        $(".botoDarkMode").addClass("transicio-2");
            
        // 2. Transicio color a transparent //
        // $(".botoDarkMode").css({ "box-shadow": `100vw 100vh ${blur}px ${spread}px transparent` });
        $(".botoDarkMode").css({ "box-shadow": `100vw 100vh 0 0 ${color}` });

        await Utils.wait(400);

        $(".botoDarkMode").removeClass("transicio-2");

        // 3. Tornar a estat inicial sense transició //
        $(".botoDarkMode")
            .css({
                "z-index": "auto",
                "box-shadow": "none"
            });
        
        $("*:not(.botoDarkMode)").css("transition", "");
        $(".botoDarkMode, .botoAutoMode").prop("disabled", false);

    }

    accioDarkMode() {
        this.m.modeFosc = !this.m.modeFosc;
        this.m.appbar.actTema();
        Utils.setCookieDays("darkmode", this.m.modeFosc ? 1 : 0)
    }

    accioAutoDarkMode() {
        this.m.modeFosc = Utils.systemDarkMode();
        this.m.appbar.actTema();
        Utils.removeCookie("darkmode");
    }
}
