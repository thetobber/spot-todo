import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItem } from '../../models/todo-item.model';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  public todoForm: FormGroup;

  public constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  public ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      completed: [false, Validators.required]
    });
  }

  public addItem() {
    let response: Observable<TodoItem>;

    const todoItem: TodoItem = {
      ...this.todoForm.value
    };

    this.todoService
      .addItem(todoItem)
      .subscribe();
  }

}
