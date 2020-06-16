import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatasetComponent} from "./dataset.component";
import {UploadComponent} from "./upload/upload.component";


const routes: Routes = [
    {
        path: '',
        children:[
            {path:'',component:DatasetComponent},
            {path:'add',component:UploadComponent}
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatasetRoutingModule { }
