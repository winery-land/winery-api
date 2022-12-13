import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import moment from 'moment';
import {
  compareAddresses,
  convertToEther,
  getIntervalOfTimestamp,
  getTodayInterval,
  getYesterdayInterval,
} from 'src/utils/helper';
import { BSC_MAINNET } from '../../constants/index';
import { BSC_TESTNET } from './../../constants/index';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

const DAYS_IN_WEEK = 7;

@ApiTags('mainnet/assets')
@Controller('mainnet/assets')
export class AssetsMainnetController {
  constructor(private readonly assetsService: AssetsService) { }

  @Get('summary')
  async getSummary() {
    return await this.assetsService.getSummary(BSC_MAINNET);
  }

  @Get('tokens')
  async getTokens() {
    return await this.assetsService.getTokens(BSC_MAINNET);
  }

  @Get('tokens/:address')
  async getToken(
    @Param('address') address: string,
  ) {
    return await this.assetsService.getToken(BSC_MAINNET, address);
  }

  @Get('pairs')
  async getPairs(
  ) {
    return await this.assetsService.getPairs(BSC_MAINNET);
  }

}
