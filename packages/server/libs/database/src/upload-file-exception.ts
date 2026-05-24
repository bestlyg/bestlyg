import { BadRequestException } from '@nestjs/common';
import { setUploadFileBadRequestFactory } from '@bestlyg/server-shared';

setUploadFileBadRequestFactory((message) => new BadRequestException(message));
