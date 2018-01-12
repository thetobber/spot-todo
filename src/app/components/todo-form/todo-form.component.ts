import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable } from 'rxjs/Observable'

import { TodoItem } from '../../models/todo-item.model'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      completed: [false, Validators.required]
    })
  }

  onSubmit(): void {
    this.form
      .disable()

    const item: TodoItem = Object
      .assign(new TodoItem(), this.form.value)

    this.todoService
      .add(item)
      .subscribe(() => {
        this.router.navigate(['home'])
      })
  }
}
