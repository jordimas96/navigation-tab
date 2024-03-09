import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { NavegacioTabComponent } from './components/appbar/navegacio-tab/navegacio-tab.component';
import { SettingsCardComponent } from './components/settings-card/settings-card.component';
import { ExperiencePageComponent } from './pages/experience-page/experience-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';


@NgModule({
    declarations: [
        AppComponent,

        // Components //
        AppbarComponent,
        SettingsCardComponent,
        NavegacioTabComponent,
    
        // Pages //
        HomePageComponent,
        ExperiencePageComponent,
        ProjectsPageComponent,
    ],
    imports: [
        BrowserModule,
        NgbModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
