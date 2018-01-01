import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  // private _data = new BehaviorSubject<TodoItem[]>([]);

  // @Input()
  // set data(items: TodoItem[]) {
  //   this._data.next(items);
  // }

  // get data() {
  //   return this._data.getValue();
  // }

  // private items: TodoItem[];

  @Input()
  public data: TodoItem[];

  @Output()
  public dataChange: EventEmitter<TodoItem[]> = new EventEmitter<TodoItem[]>();

  constructor() { }

  completeItem(item: TodoItem): void {
    item.completed = !item.completed;
  }

  deleteItem(item: TodoItem): void {
    this.data = this.data
      .filter(x => x !== item);

    this.changeData();
  }

  private changeData(): void {
    this.dataChange.emit(this.data);
  }

//   updateItem(item: TodoItem): void {
//     this.data = this.data
//       .filter(element => element !== item);

//     item.completed = item.completed ? false : true;

//     this.todoService
//       .updateItem(item)
//       .subscribe();
//   }

//   deleteItem(item: TodoItem): void {
//     this.data = this.data
//       .filter(element => element !== item);

//     this.todoService
//       .deleteItem(item.id)
//       .subscribe();
//   }

}
