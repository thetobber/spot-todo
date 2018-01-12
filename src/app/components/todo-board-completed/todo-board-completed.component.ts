import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subscription } from 'rxjs/Subscription'

import { TodoService } from '../../services/todo.service'
import { TodoItem } from '../../models/todo-item.model'

@Component({
  selector: 'app-todo-board-completed',
  templateUrl: './todo-board-completed.component.html'
})
export class TodoBoardCompletedComponent implements OnInit, OnDestroy {
  private sub: Subscription
  pending: TodoItem[]
  completed: TodoItem[]

  constructor(private todoService: TodoService) {
    this.sub = this.todoService.current
      .subscribe(this.setItems)
  }

  ngOnInit(): void {
    this.todoService
      .getAll()
      .subscribe()
  }

  ngOnDestroy(): void {
    this.sub
      .unsubscribe()
  }

  private setItems = (items: TodoItem[]): void => {
    this.pending = items
      .filter(item => item.completed)
  }
}
