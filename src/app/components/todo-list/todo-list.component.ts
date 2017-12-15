import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  private _data = new BehaviorSubject<TodoItem[]>([]);

  @Input()
  set data(items: TodoItem[]) {
    this._data.next(items);
  }

  get data() {
    return this._data.getValue();
  }

  private items: TodoItem[];

  public constructor(private todoService: TodoService) { }

  public ngOnInit(): void {
    this._data.subscribe(items => {
      this.items = items;
    });
  }

  public ngOnDestroy(): void {
    this._data.unsubscribe();
  }

  public updateItem(item: TodoItem): void {
    this.data = this.data
      .filter(element => element !== item);

    item.completed = item.completed ? false : true;

    this.todoService
      .updateItem(item)
      .subscribe();
  }

  public deleteItem(item: TodoItem): void {
    this.data = this.data
      .filter(element => element !== item);

    this.todoService
      .deleteItem(item.id)
      .subscribe();
  }

}
