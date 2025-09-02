import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_provider')
export class UserProviderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  provider_id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  provider: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  user_name?: string;

  @Column({ type: 'text', nullable: false })
  access_token: string;

  @Column({ type: 'text', nullable: true })
  refresh_token?: string;

  @Column({ type: 'timestamp', nullable: true })
  token_expires_at?: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'NOW()' })
  updated_at: Date;
}
