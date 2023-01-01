import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stations')
export class Station {
  @PrimaryGeneratedColumn('uuid')
  dbId: string;

  @IsNumber()
  @Column({
    nullable: false,
  })
  fid: number;

  @IsNumber()
  @Column({
    nullable: false,
  })
  id: number;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  nameFI: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  nameSWE: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  name: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  addressFI: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  addressSWE: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  address: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  city: string;

  @IsString()
  @MaxLength(255)
  @Column({
    nullable: false,
  })
  citySWE: string;

  @IsNumber()
  @Column({
    nullable: false,
  })
  capacity: number;

  @IsLongitude()
  @Column({
    nullable: false,
  })
  lon: number;

  @IsLatitude()
  @Column({
    nullable: false,
  })
  lat: number;
}
