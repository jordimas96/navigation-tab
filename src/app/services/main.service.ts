import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { AppbarComponent } from "../components/appbar/appbar.component";
import { Utils } from "../shared/utils";

// https://developerslogblog.wordpress.com/2019/04/23/how-to-use-angular-services-to-share-data-between-components/ //

enum Area { Front, Back, Full };

@Injectable({
    providedIn: 'root'
})
export class MainService {
    // Components //
    public appbar!: AppbarComponent;

    // Services //
    public u;

    // Variables //
    public tempsDelayCarregaPag = 1000;
    public readonly debug = window.location.origin.includes("localhost") || window.location.origin.includes("192.168.1.");
    public modeFosc: boolean = true;
    public tema: string = "";
    public scroll = window.pageYOffset;



    // NavigationTabSettings //
    public nt_settings = {
        borderRadius: 25,
        width: 100,
        sectionsString: "home, experience, projects, products, services, explore, discover, gallery, community",
        sections: ["home", "experience", "projects", "products", "services", "explore", "discover", "gallery", "community"],
    }

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public gas: GoogleAnalyticsService
    ) {
        this.u = Utils;
        
        if (this.debug) window["m"] = this;

        setTimeout(() => {
            if (this.esPantallaMobil()) {
                this.nt_settings.sectionsString = "home, experience, projects, discover, gallery";
                this.nt_settings.sections = ["home", "experience", "projects", "discover", "gallery"];
            }
        }, 0);
    }


    public log(t) { console.log(t); }
    public logDebug(t) { if (this.debug) console.log(t); }

    // Dispositius //
    // public esMobil() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); }
    // public esPc() { return !this.esMobil() }
    public esMobil() { return this.esPantallaTactil() }
    public esPc() { return !this.esPantallaTactil() }
    public esPantallaMobil() { return this.appbar.width <= 576; }
    public esPantallaPc() { return !this.esPantallaMobil(); }
    public esAndroid() { return /Android/i.test(navigator.userAgent); }
    public esPantallaTactil() { return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.maxTouchPoints > 0)); }

    // Forçar temes - debug //
    public force(tema) { Utils.setCookieDays("forçartema", tema) }
    public noforce() { Utils.removeCookie("forçartema") }


    // Funcions //
    afterRootFadeIn(funcio: Function) {
        setTimeout(async () => {
            funcio();
        }, $("app-root").is(":visible") ? 0 : this.tempsDelayCarregaPag); // Retard fadein pagina //
    }

}
