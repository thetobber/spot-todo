import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html'
})
export class TodoCompletedComponent implements OnInit {
  items: TodoItem[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService
      .getCompleted()
      .subscribe(items => this.items = items);
  }
}
