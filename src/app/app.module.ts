// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, RouterLinkWithHref  } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Instead of using an API
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Components
import { AppComponent } from './app.component';
import { TodoNavbarComponent } from './components/todo-navbar/todo-navbar.component';
import { TodoPendingComponent } from './components/todo-pending/todo-pending.component';
import { TodoCompletedComponent } from './components/todo-completed/todo-completed.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

// Services
import { MockService } from './services/mock.service';
import { TodoService } from './services/todo.service';

const routes: Routes = [
  {
    path: 'pending',
    component: TodoPendingComponent
  },
  {
    path: 'completed',
    component: TodoCompletedComponent
  },
  {
    path: '',
    redirectTo: '/pending',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoNavbarComponent,
    TodoPendingComponent,
    TodoCompletedComponent,
    TodoListComponent,
    TodoFormComponent,
    TodoEditComponent
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
