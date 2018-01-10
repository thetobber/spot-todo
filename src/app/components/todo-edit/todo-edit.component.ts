import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import { TodoItem } from '../../models/todo-item.model'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html'
})
export class TodoEditComponent implements OnInit {
  public item: TodoItem
  public todoForm: FormGroup

  public constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  public ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      completed: [false, Validators.required]
    })

    this.todoForm.disable()

    this.route.paramMap
      .switchMap(this.getItem)
      .subscribe(this.setItem)
  }

  public updateItem() {
    // TODO: Update item
  }

  private getItem = (params: ParamMap): Observable<TodoItem> =>
    this.todoService
      .get(params.get('id'))

  private setItem = (item: TodoItem): void => {
    this.item = item

    this.todoForm
      .patchValue({
        title: item.title,
        content: item.content,
        completed: item.completed
      })

    this.todoForm
      .enable()
  }
}
