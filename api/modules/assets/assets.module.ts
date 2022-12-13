import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsMainnetController } from './assets-mainnet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Asset])
  ],
  controllers: [AssetsMainnetController],
  providers: [AssetsService],
  exports: [AssetsService]
})
export class AssetsModule { }
