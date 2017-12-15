import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TodoItem } from '../models/todo-item.model';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators/tap';
import 'rxjs/add/operator/do';

@Injectable()
export class TodoService {

  private base: string = 'api';
  private httpOptions: object;
  public change = new Subject<TodoItem>();

  public constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getItem(id: string) {
    return this.httpClient
      .get<TodoItem>(this.base + '/single/' + id);
  }

  public getItems() {
    return this.httpClient
      .get<TodoItem[]>(this.base + '/items');
  }

  public addItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.httpClient
      .post<TodoItem>(this.base + '/items', todoItem, this.httpOptions)
      .do(item => this.change.next(item));
  }

  public updateItem(todoItem: TodoItem) {
    return this.httpClient
      .put<TodoItem>(this.base + '/items/' + todoItem.id, todoItem, this.httpOptions);
  }

  public deleteItem(id: string) {
    return this.httpClient
      .delete<TodoItem>(this.base + '/items/' + id, this.httpOptions);
  }

}