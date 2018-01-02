import { Component, OnInit } from '@angular/core'

import { TodoService } from '../../services/todo.service'
import { TodoItem } from '../../models/todo-item.model'

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html'
})
export class TodoPendingComponent implements OnInit {
  public items: TodoItem[]

  public constructor(private todoService: TodoService) { }

  public ngOnInit() {
    this.todoService
      .getPending()
      .subscribe(items => this.items = items)
  }

  public onUpdate(item: TodoItem) {
    this.todoService
      .update(item)
      .subscribe()
  }

  public onDelete(item: TodoItem) {
    this.todoService
      .delete(item.id)
      .subscribe()
  }
}
