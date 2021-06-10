import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/shared/todo';
import { TodoService } from 'src/app/shared/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  closed = 0;
  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach((todo) => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        } else {
          this.list.push(todo);
        }
      });
      this.closed = this.listFinished.length;
    });
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
      this.service.message('Task done success');
      this.list = this.list.filter((todo) => todo.id !== item.id);
      this.closed++;
    });
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados']);
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Task deleted success');
        this.list = this.list.filter((todo) => todo.id !== id);
      }
    });
  }
}
