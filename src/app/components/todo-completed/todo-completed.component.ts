import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-completed',
  templateUrl: './todo-completed.component.html'
})
export class TodoCompletedComponent implements OnInit {

  private items: TodoItem[];
  private todoChange: Subscription;

  public constructor(private todoService: TodoService) {
    this.todoChange = this.todoService.change
      .subscribe(item => {
        if (item.completed) {
          this.items.push(item)
        }

        return item;
      });
  }

  public ngOnInit() {
    this.todoService
      .getItems()
      .subscribe(items => {
        this.items = items.filter(item => item.completed);
        return this.items;
      });
  }

  public ngOnDestroy(): void {
    this.todoChange.unsubscribe();
  }

}
