import { Component, HostListener } from '@angular/core';
import * as $ from "jquery";
import { MainService } from 'src/app/services/main.service';
import { Utils } from '../../shared/utils';


@Component({
    selector: 'app-appbar',
    templateUrl: './appbar.component.html',
    styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent {
    
    public width = window.innerWidth;

    constructor(public m: MainService) {
        m.appbar = this;
    }
    ngOnInit() {
        this.m.afterRootFadeIn(this.afterRootFadeIn.bind(this));
        
        this.setDarkMode();

        this.setTemaSegonsHora();


        // Mostrar boto Dark Mode Auto si cal //
        if (Utils.hasCookie("darkmode")) $(".botoAutoMode").fadeIn(150);

        this.actTema();

        // Delay inicial pagina root //
        setTimeout(() => { $("app-root").fadeIn(300); }, this.m.tempsDelayCarregaPag);
    }

    afterRootFadeIn() {
        

        $("body").css({ "transition": "background-position 0.3s" });
    }

    

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
            "z-index": "10000",
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
        this.actTema();
        Utils.setCookieDays("darkmode", this.m.modeFosc ? 1 : 0)
    }

    accioAutoDarkMode() {
        this.m.modeFosc = Utils.systemDarkMode();
        this.actTema();
        Utils.removeCookie("darkmode");
    }

    setDarkMode() {
        // Establir variable dark mode //
        this.m.modeFosc = !!parseInt(Utils.getCookie("darkmode"));
        
        // Si no te cookie el traiem de system //
        if (!Utils.hasCookie("darkmode"))
            this.m.modeFosc = Utils.systemDarkMode();
    }
    
    setTemaSegonsHora(horaActual = new Date().getHours()) {
        if (Utils.hasCookie("forçartema")) { this.m.tema = Utils.getCookie("forçartema"); return; }
        
        // this.m.tema = "mati"; return;
        
        // Colors matinada, matí, tarda, vespre, nit //
        const primeraHoraNit = 1;
        const primeraHoraMatinada = 6;
        const primeraHoraMati = 9;
        const primeraHoraTarda = 15;
        const primeraHoraVespre = 20;

        // |12345|678|901234|56789|01230 //

        if (horaActual >= primeraHoraNit && horaActual < primeraHoraMatinada)
            this.m.tema = "nit";
        else if (horaActual >= primeraHoraMatinada && horaActual < primeraHoraMati)
            this.m.tema = "matinada";
        else if (horaActual >= primeraHoraMati && horaActual < primeraHoraTarda)
            this.m.tema = "mati";
        else if (horaActual >= primeraHoraTarda && horaActual < primeraHoraVespre)
            this.m.tema = "tarda";
        else
            this.m.tema = "vespre";
        
        
        const ara = new Date();
        const horaSeguent = new Date(ara.getFullYear(), ara.getMonth(), ara.getDate(), ara.getHours() + 1, 0, 0, 0);

        setTimeout(() => {
            let temaVell = this.m.tema;
            this.setTemaSegonsHora(horaSeguent.getHours());
            this.actTema();
            if (temaVell != this.m.tema)
                console.log("Theme changed because it's " + (horaSeguent.getHours()) + ":00");
        }, horaSeguent.getTime() - ara.getTime());
    }

    actTema(tema?: string | number) {
        
        if (typeof (tema) == "string") this.m.tema = tema;
        if (typeof (tema) == "number") this.m.tema = ["matinada", "mati", "tarda", "vespre", "nit"][tema - 1];
        
        $("html")
            .removeClass("dark light nit matinada mati tarda vespre")
            .addClass(this.m.modeFosc ? "dark" : "light")
            .addClass(this.m.tema);
    }


    // Debug //
    canviarVersio(value) {
        this.m.router.navigate([`/${location.pathname.split("/")[1]}/${value}`]);
    }

    

    // Funcions //
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = event.target.innerWidth;
    }
    @HostListener('window:scroll', ['$event'])
    onScroll() {
        this.m.scroll = window.pageYOffset;
    }
}
