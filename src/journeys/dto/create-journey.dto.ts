import {
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';

export class CreateJourneyDto {
  @IsDateString()
  departure: Date;

  @IsDateString()
  returnTime: Date;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  depStationId: string;

  @IsString()
  depStationName: string;

  @IsString()
  @MaxLength(3)
  @MinLength(3)
  retStationId: string;

  @IsString()
  retStationName: string;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;
}
