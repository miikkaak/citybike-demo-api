import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

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
  address: string;

  @Expose()
  @IsString()
  city: string;
}
