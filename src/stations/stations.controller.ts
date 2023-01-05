import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  // @Post()
  // create(@Body() createStationDto: CreateStationDto) {
  //   return this.stationsService.create(createStationDto);
  // }

  @Get()
  async findAll(@Query() query) {
    return this.stationsService.findAll(query);
  }

  @Get('count')
  async getCount() {
    return this.stationsService.getCount();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.stationsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStationDto: UpdateStationDto) {
  //   return this.stationsService.update(+id, updateStationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stationsService.remove(+id);
  // }
}
