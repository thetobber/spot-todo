import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html'
})
export class TodoPendingComponent implements OnInit {
  items: TodoItem[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService
      .getPending()
      .subscribe(items => this.items = items);
  }
}
