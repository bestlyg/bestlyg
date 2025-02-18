import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseEntity } from '@bestlyg/common';

@Controller('/data/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get('list')
    async getUserList() {
        const data = await this.userService.getUserList();
        return ResponseEntity.ofSuccess(data);
    }
}
