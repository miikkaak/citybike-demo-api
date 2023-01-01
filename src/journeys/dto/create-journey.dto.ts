import {
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
  IsDate,
} from 'class-validator';

export class CreateJourneyDto {
  @IsDate()
  departure: Date;

  @IsDate()
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
  durations: number;
}
