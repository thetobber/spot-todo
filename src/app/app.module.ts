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
import { TodoNavbarComponent } from './components/todo-navbar/todo-navbar.component'
import { TodoBoardComponent } from './components/todo-board/todo-board.component'
import { TodoBoardPendingComponent } from './components/todo-board-pending/todo-board-pending.component'
import { TodoBoardCompletedComponent } from './components/todo-board-completed/todo-board-completed.component'
import { TodoModalComponent } from './components/todo-modal/todo-modal.component'
import { TodoEditComponent } from './components/todo-edit/todo-edit.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'

// Services
import { MockService } from './services/mock.service'
import { TodoService } from './services/todo.service'
// import { GuardService } from './services/guard.service'


const routes: Routes = [
  {
    path: 'new',
    component: TodoFormComponent
  },
  {
    path: 'edit/:id',
    component: TodoEditComponent
  },
  {
    path: '',
    // canActivate: [GuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: TodoBoardComponent
      },
      {
        path: 'pending',
        component: TodoBoardPendingComponent
      },
      {
        path: 'completed',
        component: TodoBoardCompletedComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoNavbarComponent,
    TodoBoardComponent,
    TodoModalComponent,
    TodoListComponent,
    TodoEditComponent,
    TodoFormComponent,
    TodoBoardPendingComponent,
    TodoBoardCompletedComponent
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
