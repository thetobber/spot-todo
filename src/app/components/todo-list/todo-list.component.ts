import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  public data: TodoItem[];

  @Output()
  public dataChange: EventEmitter<TodoItem[]> = new EventEmitter<TodoItem[]>();

  @Output()
  public update: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  @Output()
  public delete: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  onUpdate(item: TodoItem) {
    item.completed = !item.completed;
    this.update.emit(item);
    this.removeItemFromList(item);
  }

  onDelete(item: TodoItem) {
    this.delete.emit(item);
    this.removeItemFromList(item);
  }

  onChange() {
    this.dataChange.emit(this.data);
  }

  private removeItemFromList(item: TodoItem) {
    this.data = this.data
      .filter(entry => entry !== item);

    this.onChange();
  }
}
