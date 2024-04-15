import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;
}
