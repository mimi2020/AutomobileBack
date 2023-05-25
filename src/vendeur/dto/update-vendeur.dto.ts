import { PartialType } from '@nestjs/swagger';
import { CreateVendeurDto } from './create-vendeur.dto';

export class UpdateVendeurDto extends PartialType(CreateVendeurDto) {}
