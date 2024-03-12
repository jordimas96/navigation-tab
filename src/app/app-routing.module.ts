import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencePageComponent } from './pages/experience-page/experience-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomePageComponent
    },
    {
        path: "experience",
        component: ExperiencePageComponent
    },
    {
        path: "projects",
        component: ProjectsPageComponent
    },
    {
        path: "**",
        component: GenericPageComponent
        // redirectTo: "home"
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
