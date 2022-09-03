import { BaseController } from '@/base';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { auth, database } from '@/modules';

@Controller('/application/gang')
export class GangController extends BaseController {
  constructor(
    private readonly accountService: database.GangAccountService,
    private readonly billService: database.GangBillService,
    private readonly typeService: database.GangTypeService,
  ) {
    super();
  }

  @Get('/profile')
  @UseGuards(auth.JwtAuthGuard)
  async getProfile(@Req() req: Request & { user: auth.AuthDto }) {
    return req.user;
  }

  @Get('/account')
  @UseGuards(auth.JwtAuthGuard)
  async getAccount(@Req() req: Request & { user: auth.AuthDto }) {
    const user = req.user;
    return this.result(this.accountService.listLogic({ userId: user._id }));
  }

  @Post('/account')
  @UseGuards(auth.JwtAuthGuard)
  async createAccount(
    @Req() req: Request & { user: auth.AuthDto },
    @Body() dto: Omit<database.GangAccountDto, 'userId'>,
  ) {
    const user = req.user;
    return this.result(
      this.accountService.create({ ...dto, userId: user._id }),
    );
  }

  @Put('/account')
  @UseGuards(auth.JwtAuthGuard)
  async updateAccount(@Body() dto: Omit<database.GangAccountDto, 'userId'>) {
    return this.result(this.accountService.update({ ...dto }));
  }

  @Get('/type')
  @UseGuards(auth.JwtAuthGuard)
  async getType(@Req() req: Request & { user: auth.AuthDto }) {
    const user = req.user;
    return this.result(this.typeService.listLogic({ userId: user._id }));
  }

  @Post('/type')
  @UseGuards(auth.JwtAuthGuard)
  async createType(
    @Req() req: Request & { user: auth.AuthDto },
    @Body() dto: Omit<database.GangTypeDto, 'userId'>,
  ) {
    const user = req.user;
    return this.result(this.typeService.create({ ...dto }));
  }

  @Put('/type')
  @UseGuards(auth.JwtAuthGuard)
  async updateType(@Body() dto: Omit<database.GangTypeDto, 'userId'>) {
    return this.result(this.typeService.update({ ...dto }));
  }

  @Get('/bill')
  @UseGuards(auth.JwtAuthGuard)
  async getBill(@Req() req: Request & { user: auth.AuthDto }) {
    const user = req.user;
    return this.result(this.billService.listLogic({ userId: user._id }));
  }
}
