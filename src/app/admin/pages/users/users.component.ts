import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest, Observable, throwError } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { FirebaseUserOptions } from 'src/app/auth/interfaces';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { UserService } from 'src/app/admin/services/user/user.service';
import { OrdersService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly displayedColumns: string[];
  public readonly options: string[];
  public readonly pageSizeOptions: number[];

  public readonly dateControl: FormControl;
  public readonly roleControl: FormControl;

  public dataSource$: Observable<MatTableDataSource<FirebaseUserOptions>>;

  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _ordersService: OrdersService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = ['order', 'status'];
    this.pageSizeOptions = [5, 10, 25];
  }

  ngAfterViewInit(): void {
    this.dataSource$ = this._ordersService.getUserOrders().pipe(
      map(data => new MatTableDataSource(data)),
      tap((dataSource: any) => {
        dataSource.paginator = this.paginator;
        dataSource.sort = this.sort;
      })
    );
  }

  // private getFilteredItems(): Observable<any> {
  //   const originalItems$ = this._userService.getUsers();

  // return combineLatest([originalItems$]).pipe(
  //   map(([originalItems]) =>
  //     originalItems.filter((item) => this.filterByRole(item, role)).filter((item) => this.filterByDate(item, date))
  //   )
  // );
  // }

  public async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {}
    });

    const result = await dialogRef.afterClosed().toPromise();

    if (result?.order) {
      await this.createOrder(result);
    }
  }

  public async createOrder(data): Promise<void> {
    try {
      // const data = await this._authService.createUser(options);
      // await this._authService.updateUsersData({ data, options });
      await this._ordersService.createNewOrder(data);
    } catch (er) {
      throwError(er);
    }
  }
}
