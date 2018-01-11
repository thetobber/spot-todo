import { Component, OnInit } from '@angular/core'

import { TodoService } from '../../services/todo.service'
import { TodoItem } from '../../models/todo-item.model'

@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html'
})
export class TodoBoardComponent implements OnInit {
  pending: TodoItem[]
  completed: TodoItem[]

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService
      .getPending()
      .subscribe(response => this.pending = response)

    this.todoService
      .getCompleted()
      .subscribe(response => this.completed = response)
  }

  onUpdate(item: TodoItem) {
    this.todoService
      .update(item)
      .subscribe()
  }

  onDelete(item: TodoItem) {
    this.todoService
      .delete(item.id)
      .subscribe()
  }
}
