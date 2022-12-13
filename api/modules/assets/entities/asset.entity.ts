import { AbstractEntity } from 'src/common/entities/abstract-entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class Asset extends AbstractEntity {
  @Column()
  lpAddress: string;

  @Column()
  baseId: string;

  @Column()
  baseName: string;

  @Column()
  baseSymbol: string;

  @Column()
  baseVolume: string;

  @Column()
  baseDecimal: number;

  @Column()
  quoteId: string;

  @Column()
  quoteName: string;

  @Column()
  quoteDecimal: number;

  @Column()
  quoteSymbol: string;

  @Column()
  quoteVolume: string;

  @Column()
  lastPrice: string;

  @Column()
  chainId: number;

  @Column()
  isFarm: boolean;

  @Column()
  lastBlockFetch: number;

  @BeforeInsert()
  async beforeInsert() {
    if (this.quoteId) this.quoteId = this.quoteId.toLowerCase();
    if (this.baseId) this.baseId = this.baseId.toLowerCase();
    if (this.lpAddress) this.lpAddress = this.lpAddress.toLowerCase();
  }
}
