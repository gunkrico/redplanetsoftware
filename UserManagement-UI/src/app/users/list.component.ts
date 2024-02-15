
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    // users?: any[];
    items: any[] = [];
    pageOfItems?: Array<any>;
    sortProperty: string = 'id';
    sortOrder = 1;
    loading = false;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        // fetch items from the backend api
        this.loading = true;
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.items = users;
                this.loading = false;
            });
    }

    deleteUser(id: string) {
        const user = this.items!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.items = this.items!.filter(x => x.id !== id));
    }

    onChangePage(pageOfItems: Array<any>) {
        // update current page of items
        this.pageOfItems = pageOfItems;
    }

    sortBy(property: string) {
        this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
        this.sortProperty = property;
        this.items = [...this.items.sort((a: any, b: any) => {
            // sort comparison function
            let result = 0;
            if (a[property] < b[property]) {
                result = -1;
            }
            if (a[property] > b[property]) {
                result = 1;
            }
            return result * this.sortOrder;
        })];
    }

    sortIcon(property: string) {
        if (property === this.sortProperty) {
            return this.sortOrder === 1 ? '☝️' : '👇';
        }
        return '';
    }
}
