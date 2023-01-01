import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly repository: Repository<Station>,
  ) {}

  create(createStationDto: CreateStationDto) {
    return 'This action adds a new station';
  }

  async createMany(
    createJourneyDtos: Array<CreateStationDto>,
  ): Promise<Boolean> {
    console.log(
      `Queueing ${createJourneyDtos.length} items for database write...`,
    );
    try {
      const newJourneys = this.repository.create(createJourneyDtos);
      const saved = this.repository.save(newJourneys, { chunk: 500 });
      saved.then(() => {
        console.log(`${createJourneyDtos.length} entries saved successfully`);
        return true;
      });
    } catch (error) {
      return false;
    }
  }

  async truncate() {
    return await this.repository.clear();
  }

  findAll() {
    return `This action returns all stations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} station`;
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return `This action updates a #${id} station`;
  }

  remove(id: number) {
    return `This action removes a #${id} station`;
  }
}
