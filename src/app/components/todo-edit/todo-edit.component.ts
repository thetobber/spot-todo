import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import { TodoService } from '../../services/todo.service'
import { TodoItem } from '../../models/todo-item.model'

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html'
})
export class TodoEditComponent implements OnInit {
  public item: TodoItem

  public constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  public ngOnInit(): void {
    this.route.paramMap
      .switchMap(this.getItem)
      .subscribe(this.setItem)
  }

  private getItem = (params: ParamMap): Observable<TodoItem> =>
    this.todoService.get(params.get('id'))

  private setItem = (item: TodoItem): void => {
    this.item = item
  }
}
