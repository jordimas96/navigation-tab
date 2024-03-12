import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { NavigationTabComponent } from './components/appbar/navigation-tab/navigation-tab.component';
import { SettingsCardComponent } from './components/settings-card/settings-card.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ExperiencePageComponent } from './pages/experience-page/experience-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';

@NgModule({
    declarations: [
        AppComponent,

        // Components //
        AppbarComponent,
        SettingsCardComponent,
        NavigationTabComponent,
    
        // Pages //
        HomePageComponent,
        ExperiencePageComponent,
        ProjectsPageComponent,
        GenericPageComponent,
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
