import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'

import { TodoItem } from '../models/todo-item.model'

@Injectable()
export class TodoService {
  private base: string = 'api'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  public get(id: string): Observable<TodoItem> {
    return this.httpClient
      .get<TodoItem>(this.base + '/items/' + id)
  }

  public getAll(): Observable<TodoItem[]> {
    return this.httpClient
      .get<TodoItem[]>(this.base + '/items')
  }

  public getPending(): Observable<TodoItem[]> {
    return this
      .getAll()
      .map(items => items.filter(item => !item.completed))
  }

  public getCompleted(): Observable<TodoItem[]> {
    return this
      .getAll()
      .map(items => items.filter(item => item.completed))
  }

  public add(todoItem: TodoItem) {
    return this.httpClient
      .post<TodoItem>(this.base + '/items', todoItem, this.httpOptions)
  }

  public update(todoItem: TodoItem) {
    return this.httpClient
      .put<TodoItem>(this.base + '/items/' + todoItem.id, todoItem, this.httpOptions)
  }

  public delete(id: string) {
    return this.httpClient
      .delete<TodoItem>(this.base + '/items/' + id, this.httpOptions)
  }
}
