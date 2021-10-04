import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Action } from '../enums/action.enum';

@Entity('storage')
class Storage {
  @PrimaryColumn()
  id: string;

  @Column()
  discount: string;

  @Column()
  total_sale: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  action: Action;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_quantity: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Storage };
