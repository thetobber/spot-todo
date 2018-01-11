// Modules
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes, RouterLinkWithHref } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Instead of using an API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'

// Components
import { AppComponent } from './app.component'
import { TodoEditComponent } from './components/todo-edit/todo-edit.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'
import { TodoBoardComponent } from './components/todo-board/todo-board.component'
import { TodoModalComponent } from './components/todo-modal/todo-modal.component'

// Services
import { MockService } from './services/mock.service'
import { TodoService } from './services/todo.service';

const routes: Routes = [
  {
    path: '',
    component: TodoBoardComponent
  },
  {
    path: 'e/:id',
    component: TodoEditComponent,
    outlet: 'modal'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoEditComponent,
    TodoBoardComponent,
    TodoModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockService,
      { dataEncapsulation: false }
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
