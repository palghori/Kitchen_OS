import { Module } from '@nestjs/common';
import { KitchensService } from './kitchens.service';
import { KitchensController } from './kitchens.controller';

@Module({
  providers: [KitchensService],
  controllers: [KitchensController]
})
export class KitchensModule {}
