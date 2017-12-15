import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TodoItem } from '../models/todo-item.model';

export class MockService implements InMemoryDbService {

  constructor() { }

  public createDb(): object {
    const items: TodoItem[] = [
      {
        id: 'f6430c26-7e47-4a6b-ba76-cb36d61c7726',
        title: 'Lorem ipsum dolor',
        content: 'Consectetur adipiscing elit. Nam interdum tortor nibh, a semper turpis lobortis eget.',
        completed: false
      },
      {
        id: 'b938ede5-f045-4199-b6bd-fb60cac8ad08',
        title: 'Sed et suscipit libero',
        content: 'ras ornare nisi eu lacus sollicitudin tempor. Nunc placerat varius turpis, a aliquet nulla feugiat in.',
        completed: false
      },
      {
        id: 'a38c777f-cf2a-47ec-8b7e-8286ba00fdcd',
        title: 'Erat tellus congue lorem',
        content: 'Gravida augue est eget dolor. Maecenas id felis libero. Nullam lectus nisi, dignissim et rutrum non, egestas ac massa.',
        completed: true
      },
      {
        id: '4ee51a26-164f-41cf-bfbf-f4f681810535',
        title: 'Etiam ut turpis non',
        content: 'Utate quis. Sed auctor dignissim dolor, aliquet ultricies ante aliquam sed. Proin euismod quis orci at rutrum. Etiam malesuada consequat dui non commodo.',
        completed: true
      },
      {
        id: '7bddbc72-8462-4381-879e-31390f5466d2',
        title: 'Purus vestibulum eu',
        content: 'Donec at erat magna. In laoreet orci at dolor imperdiet consequat. Nulla sit amet efficitur lorem. Nam dapibus orci et leo rutrum, in porttitor libero venenatis.',
        completed: true
      }
    ];

    return { items };
  }

  genId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
