import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable } from 'rxjs/Observable'

import { TodoItem } from '../../models/todo-item.model'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent implements OnInit {
  public todoForm: FormGroup

  public constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  public ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      completed: [false, Validators.required]
    })
  }

  public addItem() {
    let response: Observable<TodoItem>

    const todoItem: TodoItem = {
      ...this.todoForm.value
    }

    this.todoService
      .add(todoItem)
      .subscribe()
  }
}
