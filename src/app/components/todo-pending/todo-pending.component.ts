import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../../models/todo-item.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo-pending',
  templateUrl: './todo-pending.component.html',
  styleUrls: ['./todo-pending.component.scss']
})
export class TodoPendingComponent implements OnInit, OnDestroy {

  private items: TodoItem[];
  private todoChange: Subscription;

  public constructor(private todoService: TodoService) {
    this.todoChange = this.todoService.change
      .subscribe(item => {
        if (!item.completed) {
          this.items.push(item)
        }

        return item;
      });
  }

  public ngOnInit(): void {
    this.todoService
      .getItems()
      .subscribe(items => {
        this.items = items.filter(item => !item.completed);
        return this.items;
      });
  }

  public ngOnDestroy(): void {
    this.todoChange.unsubscribe();
  }

}
