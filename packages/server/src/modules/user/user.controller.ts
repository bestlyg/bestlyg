import { Controller } from '@nestjs/common';
import { UserModel, User } from './user.model';
import { UserService } from './user.service';
import { DataBaseController } from '@/database';

@Controller('user')
export class UserController extends DataBaseController<User, UserModel> {
  constructor(service: UserService) {
    super(service);
    this.service.clear();
    new Array(21).fill(0).map(async (_, i) => {
      await this.service
        .create({
          name: 'herry' + (i + 1),
          age: i + 1,
          time: new Date(`2021/7/${i + 1}`),
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
}
