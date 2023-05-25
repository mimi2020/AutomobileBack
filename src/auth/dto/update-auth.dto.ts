import { PartialType } from '@nestjs/swagger';
import { CreateloginDto } from './create-login.dto';

export class UpdateAuthDto extends PartialType(CreateloginDto) {}
