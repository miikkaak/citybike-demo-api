import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Like, Repository } from 'typeorm';
import { CreateStationDto } from './dto/create-station.dto';
import { ReadStationDto } from './dto/read-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './entities/station.entity';

interface StationsQuery {
  take: number;
  page: number;
  skip: number;
  keyword: string;
}

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
    createStationDtos: Array<CreateStationDto>,
  ): Promise<Boolean> {
    console.log(
      `Queueing ${createStationDtos.length} items for database write...`,
    );
    try {
      const newStations = this.repository.create(createStationDtos);
      // console.log(newStations);
      const saved = this.repository.save(newStations, { chunk: 500 });
      saved.then(() => {
        console.log(`${createStationDtos.length} entries saved successfully`);
        return true;
      });
    } catch (error) {
      return false;
    }
  }

  async truncate() {
    return await this.repository.clear();
  }

  async findAll(query: StationsQuery): Promise<ReadStationDto[]> {
    const take = query?.take || 10;
    const page = query?.page || 1;
    const skip = (page - 1) * take;
    const keyword = query?.keyword?.toString() || '';

    const users = await this.repository.find({
      where: { name: Like('%' + keyword + '%') },
      take: take,
      skip: skip,
      order: { name: 'ASC' },
    });

    return plainToInstance(ReadStationDto, users);
  }

  // Get count for server side pagination
  async getCount(): Promise<number> {
    return await this.repository.count();
  }

  findOne(id: number) {
    return plainToInstance(
      ReadStationDto,
      this.repository.findOne({ where: { id: id } }),
    );
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    return `This action updates a #${id} station`;
  }

  remove(id: number) {
    return `This action removes a #${id} station`;
  }
}
