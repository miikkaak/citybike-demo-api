import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsLatitude,
  isLongitude,
  IsLongitude,
} from 'class-validator';

export class CreateStationDto {
  @IsNumber()
  fid: number;

  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(255)
  nameFI: string;

  @IsString()
  @MaxLength(255)
  nameSWE: string;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  addressFI: string;

  @IsString()
  @MaxLength(255)
  addressSWE: string;

  @IsString()
  @MaxLength(255)
  city: string;

  @IsString()
  @MaxLength(255)
  citySWE: string;

  @IsString()
  @MaxLength(255)
  operator: string;

  @IsNumber()
  capacity: number;

  @IsLongitude()
  lon: number;

  @IsLatitude()
  lat: number;
}
