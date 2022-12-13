import { Injectable } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ADDRESSES } from 'src/constants/address';
import { BscScan } from 'src/utils/bscscan';
import { Contract, ProviderType } from 'src/utils/contract';
import {
  compareAddresses,
  convertToEther,
  getCurrent,
  getCurrentInSeconds,
  getDateInterval,
  getIntervalHourOfTimestamp,
  getIntervalOfTimestamp,
  getThisHourInterval,
  getThisMonthInterval,
  getTodayInterval,
  toBigNumber,
} from 'src/utils/helper';
import { Multicall } from 'src/utils/multicall';
import { Repository } from 'typeorm';
import LPToken from '../../constants/abis/lp-token.json';
import PriceGetter from '../../constants/abis/price-getter.json';
import { BSC_MAINNET, BSC_TESTNET } from './../../constants/index';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetTrackingDay } from './entities/asset-tracking-day';
import { AssetTrackingHour } from './entities/asset-tracking-hour';
import { AssetTransaction } from './entities/asset-transaction';
import { AssetVolumeDay } from './entities/asset-volume-day';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRep: Repository<Asset>
  ) { }

  public async getSummary(chainId: number) {
    const assets = await this.assetRep.find({ where: { chainId } });
    const result = {};
    const BNBAsset = assets.find(item => item.baseSymbol == 'WBNB' && item.quoteSymbol == 'BUSD')
    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];
      const {
        baseId,
        quoteId,
        baseName,
        baseSymbol,
        baseVolume,
        quoteName,
        quoteSymbol,
        quoteVolume,
        lastPrice,
      } = asset;
      const key = `${asset.baseId}-${asset.quoteId}`;
      const liquidity = +lastPrice * +baseVolume * 2
      const liquidityBNB = BNBAsset ? +liquidity / +BNBAsset.lastPrice : liquidity
      // Format data
      // "0x..._0x...": {                  // BEP20 token addresses, joined by an underscore
      //   "price": "...",                 // price denominated in token1/token0
      //   "base_volume": "...",           // last 24h volume denominated in token0
      //   "quote_volume": "...",          // last 24h volume denominated in token1
      //   "liquidity": "...",             // liquidity denominated in USD
      //   "liquidity_BNB": "..."          // liquidity denominated in BNB
      // },
      const value = {
        price: lastPrice,
        base_volume: baseVolume,
        quote_volume: quoteVolume,
        liquidity: liquidity + '',
        liquidity_BNB: liquidityBNB + '',
      };
      result[key] = value;
    }

    return result;
  }

  public async getTokens(chainId: number) {
    const assets = await this.assetRep.find({ where: { chainId } });
    const result = {};
    const BNBAsset = assets.find(item => item.baseSymbol == 'WBNB' && item.quoteSymbol == 'BUSD')
    console.log('BNBAsset:', BNBAsset)
    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];
      const {
        baseId,
        quoteId,
        baseName,
        baseSymbol,
        baseVolume,
        quoteName,
        quoteSymbol,
        quoteVolume,
        lastPrice,
      } = asset;
      const key = `${asset.baseId}`;
      const priceBNB = BNBAsset ? +lastPrice / +BNBAsset.lastPrice : lastPrice
      // Format data
      // "0x...": {                        // the address of the BEP20 token
      //   "name": "...",                  // not necessarily included for BEP20 tokens
      //   "symbol": "...",                // not necessarily included for BEP20 tokens
      //   "price": "...",                 // price denominated in USD
      //   "price_BNB": "...",             // price denominated in BNB
      // }
      const value = {
        name: baseName,
        symbol: baseSymbol,
        price: lastPrice,
        price_BNB: priceBNB + '',
      };
      result[key] = value;
    }

    return result;
  }

  public async getToken(chainId: number, address: string) {
    const assets = await this.assetRep.find({ where: { chainId } });
    const result = {};
    const BNBAsset = assets.find(item => item.baseSymbol == 'WBNB' && item.quoteSymbol == 'BUSD')

    const asset = assets.find(item => item.baseId.toLowerCase() == address.toLowerCase())
    const {
      baseId,
      quoteId,
      baseName,
      baseSymbol,
      baseVolume,
      quoteName,
      quoteSymbol,
      quoteVolume,
      lastPrice,
    } = asset;

    const priceBNB = BNBAsset ? +lastPrice / +BNBAsset.lastPrice : lastPrice
    // Format data
    // {                        // the address of the BEP20 token
    //   "name": "...",                  // not necessarily included for BEP20 tokens
    //   "symbol": "...",                // not necessarily included for BEP20 tokens
    //   "price": "...",                 // price denominated in USD
    //   "price_BNB": "...",             // price denominated in BNB
    // }
    const value = {
      name: baseName,
      symbol: baseSymbol,
      price: lastPrice,
      price_BNB: priceBNB + '',
    };

    return value;
  }

  public async getPairs(chainId: number) {
    const assets = await this.assetRep.find({ where: { chainId } });
    const result = {};
    const BNBAsset = assets.find(item => item.baseSymbol == 'WBNB' && item.quoteSymbol == 'BUSD')
    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];
      const {
        baseId,
        quoteId,
        baseName,
        baseSymbol,
        baseVolume,
        quoteName,
        quoteSymbol,
        quoteVolume,
        lastPrice,
        lpAddress
      } = asset;
      const key = `${asset.baseId}-${asset.quoteId}`;
      const liquidity = +lastPrice * +baseVolume * 2
      const liquidityBNB = BNBAsset ? +liquidity / +BNBAsset.lastPrice : liquidity
      // Format data
      // "data": {
      //   "0x..._0x...": {                  // the asset ids of BNB and BEP20 tokens, joined by an underscore
      //     "pair_address": "0x...",        // pair address
      //     "base_name": "...",             // token0 name
      //     "base_symbol": "...",           // token0 symbol
      //     "base_address": "0x...",        // token0 address
      //     "quote_name": "...",            // token1 name
      //     "quote_symbol": "...",          // token1 symbol
      //     "quote_address": "0x...",       // token1 address
      //     "price": "...",                 // price denominated in token1/token0
      //     "base_volume": "...",           // volume denominated in token0
      //     "quote_volume": "...",          // volume denominated in token1
      //     "liquidity": "...",             // liquidity denominated in USD
      //     "liquidity_BNB": "..."          // liquidity denominated in BNB
      //   },

      const value = {
        pair_address: lpAddress,        // pair address
        base_name: baseName,             // token0 name
        base_symbol: baseSymbol,           // token0 symbol
        base_address: baseId,        // token0 address
        quote_name: quoteName,            // token1 name
        quote_symbol: quoteSymbol,          // token1 symbol
        quote_address: quoteId,       // token1 address
        price: lastPrice,                 // price denominated in token1/token0
        base_volume: baseVolume,           // volume denominated in token0
        quote_volume: quoteVolume,          // volume denominated in token1
        liquidity: liquidity + '',             // liquidity denominated in USD
        liquidity_BNB: liquidityBNB + ''
      };
      result[key] = value;
    }

    return result;
  }

}
