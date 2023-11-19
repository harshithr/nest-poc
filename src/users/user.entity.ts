
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  token: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted new User ${this.id}`);
    
  }
}
