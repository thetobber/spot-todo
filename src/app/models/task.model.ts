export class Task {
  id?: string
  title?: string
  content?: string
  created?: Date = new Date()
  completed: boolean = false
}
