import { Controller, Get, Logger } from '@nestjs/common';
import { ResponseEntity } from '@bestlyg/common';
import { UserService } from '@bestlyg-server/database';

@Controller('/database/user')
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private readonly userService: UserService) {}

    @Get('list')
    async getUserList() {
        const data = await this.userService.find();
        return ResponseEntity.ofSuccess(data);
    }
}
