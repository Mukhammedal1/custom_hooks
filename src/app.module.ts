import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://newAdmin:newPassword777@newcluster.nfitn.mongodb.net/todo?retryWrites=true&w=majority&appName=newCluster`,
    ),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
