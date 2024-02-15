import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent,
        PaginationComponent
    ]
})
export class UsersModule { }