import { Component, OnInit, ElementRef } from '@angular/core'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'

import { TodoItem } from '../../models/todo-item.model'
import { TodoService } from '../../services/todo.service'
import { TodoModalComponent } from '../todo-modal/todo-modal.component'

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html'
})
export class TodoEditComponent implements OnInit {
  item: TodoItem = new TodoItem()
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap(this.getItemId)
      .subscribe(this.setItem)

    this.form = this.formBuilder
      .group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        completed: [false, Validators.required]
      })

    this.form.disable()
  }

  onSubmit($event: Event, modal: TodoModalComponent): void {
    this.form
      .disable()

    let item = { ...this.item }
    Object.assign(item, this.form.value)

    this.todoService
      .update(item)
      .subscribe(() => {
        modal.onClose($event)
      })
  }

  private getItemId = (params: ParamMap): Observable<TodoItem> =>
    this.todoService
      .get(params.get('id'))

  private setItem = (item: TodoItem): void => {
    this.item = item

    this.form
      .patchValue({
        title: item.title,
        content: item.content,
        completed: item.completed
      })

    this.form.enable()
  }
}
