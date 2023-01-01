import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('journeys')
export class Journey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsDateString()
  @Column({
    nullable: false,
  })
  departure: Date;

  @IsDateString()
  @Column({
    nullable: false,
  })
  returnTime: Date;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @Column({
    nullable: false,
  })
  depStationId: string;

  @IsString()
  @Column({
    nullable: false,
  })
  depStationName: string;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  @Column({
    nullable: false,
  })
  retStationId: string;

  @IsString()
  @Column({
    nullable: false,
  })
  retStationName: string;

  @IsNumber()
  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  distance: number;

  @IsNumber()
  @Column({
    nullable: false,
  })
  duration: number;
}
