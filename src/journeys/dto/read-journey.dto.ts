import { Exclude, Expose } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@Exclude()
export class ReadJourneyDto {
  @Expose()
  @IsString()
  depStationName: string;

  @Expose()
  @IsString()
  retStationName: string;

  @Expose()
  @IsNumber()
  distance: number;

  @Expose()
  @IsNumber()
  duration: number;
}
