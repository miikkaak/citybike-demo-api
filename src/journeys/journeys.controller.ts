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
import { JourneysService } from './journeys.service';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';

@Controller('journeys')
export class JourneysController {
  constructor(private readonly journeysService: JourneysService) {}

  @Post()
  async create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeysService.create(createJourneyDto);
  }

  @Get()
  async findAll(@Query() query) {
    return this.journeysService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeysService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateJourneyDto: UpdateJourneyDto) {
  //   return this.journeysService.update(+id, updateJourneyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.journeysService.remove(+id);
  // }
}
