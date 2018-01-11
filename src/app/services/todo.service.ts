import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'

import { TodoItem } from '../models/todo-item.model'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class TodoService {
  private base: string = 'api'
  private source = new BehaviorSubject<TodoItem[]>([])
  current = this.source.asObservable()

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  get(id: string): Observable<TodoItem> {
    return this.httpClient
      .get<TodoItem>(this.base + '/items/' + id)
  }

  getAll(): Observable<TodoItem[]> {
    return this.httpClient
      .get<TodoItem[]>(this.base + '/items')
      .do(this.setItems)
  }

  private setItems = (items: TodoItem[]): void => {
    this.source.next(items)
  }

  add(item: TodoItem): Observable<TodoItem> {
    return this.httpClient
      .post<TodoItem>(this.base + '/items', item, this.httpOptions)
      .do(this.addItem)
  }

  private addItem = (newItem: TodoItem): void => {
    const items = this.source
      .getValue()

    items.push(newItem)

    this.source
      .next(items)
  }

  update(item: TodoItem): Observable<TodoItem> {
    return this.httpClient
      .put<TodoItem>(this.base + '/items/' + item.id, item, this.httpOptions)
      .do(() => { this.updateItem(item) })
  }

  private updateItem(newItem: TodoItem): void {
    const items = this.source
      .getValue()

    let item = items
      .find(old => old.id === newItem.id)

    Object.assign(item, newItem)

    this.source
      .next(items)
  }

  delete(id: string) {
    return this.httpClient
      .delete<TodoItem>(this.base + '/items/' + id, this.httpOptions)
  }
}
