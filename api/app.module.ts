import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AssetsModule } from './modules/assets/assets.module';
import { BidsModule } from './modules/bids/bids.module';
import { ChildrenSummaryModule } from './modules/children-summary/children-summary.module';
import { ConfigurationsModule } from './modules/configurations/configurations.module';
import { CustomersModule } from './modules/customers/customers.module';
import { GalleryLaunchpadTransactionModule } from './modules/gallery-launchpad-transaction/gallery-launchpad-transaction.module';
import { GalleryLaunchpadModule } from './modules/gallery-launchpad/gallery-launchpad.module';
import { IdoModule } from './modules/ido/ido.module';
import { LotteryModule } from './modules/lottery/lottery.module';
import { MarketAuctionsModule } from './modules/market-auctions/market-auctions.module';
import { MarketOffersModule } from './modules/market-offers/market-offers.module';
import { MarketRankingsModule } from './modules/market-rankings/market-rankings.module';
import { MarketTransactionsModule } from './modules/market-transactions/market-transactions.module';
import { MasterchefModule } from './modules/masterchef/masterchef.module';
import { NftGalleryModule } from './modules/nft-gallery/nft-gallery.module';
import { NftModule } from './modules/nft/nft.module';
import { ParentSummaryModule } from './modules/parent-summary/parent-summary.module';
import { RefRanksModule } from './modules/ref-ranks/ref-ranks.module';
import { RefModule } from './modules/ref/ref.module';
import { RewardHistoryModule } from './modules/reward-history/reward-history.module';
import { RewardWithdrawModule } from './modules/reward-withdraw/reward-withdraw.module';
import { RouterModule } from './modules/router/router.module';
import { BackupModule } from './modules/backup/backup.module';

@Module({
  imports: [
    // Config .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Cronjob
    // ScheduleModule.forRoot(),

    // Config typeorm
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: +process.env.MONGO_PORT,
      username: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
      extra: { authSource: 'admin' },
    }),
    BidsModule,
    CustomersModule,
    MarketAuctionsModule,
    MarketOffersModule,
    MarketTransactionsModule,
    MarketRankingsModule,
    ConfigurationsModule,
    ChildrenSummaryModule,
    ParentSummaryModule,
    RefModule,
    RewardHistoryModule,
    LotteryModule,
    MasterchefModule,
    RouterModule,
    RewardWithdrawModule,
    NftModule,
    AssetsModule,
    IdoModule,
    RefRanksModule,
    GalleryLaunchpadModule,
    NftGalleryModule,
    GalleryLaunchpadTransactionModule,
    BackupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
