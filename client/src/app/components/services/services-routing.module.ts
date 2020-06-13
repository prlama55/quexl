import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicesComponent} from "./services.component";
import {AddServiceComponent} from "./add/add.component";


const routes: Routes = [
    {
        path: '',
        children:[
            {path: '', component: ServicesComponent },
            {path: 'add', component: AddServiceComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ServicesRoutingModule { }
