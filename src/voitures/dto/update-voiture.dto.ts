import { PartialType } from '@nestjs/swagger';
import { CreateVoitureDto } from './create-voiture.dto';

export class UpdateVoitureDto extends PartialType(CreateVoitureDto) {}
