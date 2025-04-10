import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoModel.create(createTodoDto);
  }

  findAll() {
    return this.todoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  complete(id: string) {
    return this.todoModel.findByIdAndUpdate(id, { completed: true });
  }

  activate(id: string) {
    return this.todoModel.findByIdAndUpdate(id, { completed: false });
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
