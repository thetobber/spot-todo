import { Component, Output, EventEmitter, HostListener } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html'
})
export class TodoModalComponent {
  @Output()
  modalClose: EventEmitter<any> = new EventEmitter<any>()

  // @ViewChild('modal')
  // private modal: ElementRef

  // @ViewChild('overlay')
  // private overlay: ElementRef

  constructor(private router: Router) { }

  // ngAfterViewInit(): void {
  //     this.overlay.nativeElement.classList.add('show')
  //     this.modal.nativeElement.classList.add('show', 'd-block')
  // }

  @HostListener('document:keyup.escape', ['$event'])
  onEscape($event: KeyboardEvent): void {
    this.onClose($event)
  }

  onClose($event): void {
    this.router.navigate([{ outlets: { modal: null } }])
    this.modalClose.next($event)
  }
}
