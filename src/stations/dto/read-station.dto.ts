import { Exclude, Expose } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsString } from 'class-validator';

@Exclude()
export class ReadStationDto {
  @Expose()
  @IsNumber()
  fid: number;

  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  nameFI: string;

  @Expose()
  @IsString()
  nameSWE: string;

  @Expose()
  @IsString()
  addressFI: string;

  @Expose()
  @IsString()
  addressSWE: string;

  @Expose()
  @IsString()
  city: string;

  @Expose()
  @IsLatitude()
  lat: string;

  @Expose()
  @IsLongitude()
  lon: string;
}
