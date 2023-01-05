import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { ReadJourneyDto } from './dto/read-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { Journey } from './entities/journey.entity';

interface JourneyQuery {
  take: number;
  skip: number;
  page: number;
}

@Injectable()
export class JourneysService {
  constructor(
    @InjectRepository(Journey)
    private journeyRepository: Repository<Journey>,
  ) {}

  async create(createJourneyDto: CreateJourneyDto): Promise<Journey> {
    try {
      const newJourney = this.journeyRepository.create(createJourneyDto);
      const saved = this.journeyRepository.save(newJourney);
      console.log(saved);

      return saved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createMany(
    createJourneyDtos: Array<CreateJourneyDto>,
  ): Promise<Boolean> {
    console.log(
      `Queueing ${createJourneyDtos.length} items for database write...`,
    );
    try {
      const newJourneys = this.journeyRepository.create(createJourneyDtos);
      // console.log(newStations);
      const saved = this.journeyRepository.save(newJourneys, { chunk: 500 });
      saved.then(() => {
        console.log(`${createJourneyDtos.length} entries saved successfully`);
        return true;
      });
    } catch (error) {
      return false;
    }
    // try {
    //   const newJourneys = this.journeyRepository.create(createJourneyDtos);

    //   const saved = await this.dataSource
    //     .createQueryBuilder()
    //     .insert()
    //     .into(Journey)
    //     .values(newJourneys)
    //     .execute();

    //   console.log(saved);
    //   return true;
    // } catch (error) {
    //   return false;
    // }
  }

  async truncate() {
    return await this.journeyRepository.clear();
  }

  //Paginated find-function to journeys
  async findAll(query: JourneyQuery): Promise<ReadJourneyDto[]> {
    const take = query?.take || 10;
    const page = query?.page || 1;
    const skip = (page - 1) * take;

    const users = await this.journeyRepository.find({
      take: take,
      skip: skip,
      order: { departure: 'DESC' },
    });

    return plainToInstance(ReadJourneyDto, users);
  }

  // Get count for server side pagination
  async getCount(): Promise<number> {
    return await this.journeyRepository.count();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} journey`;
  // }

  // Find all with given departure station id
  async findFrom(id: string) {
    return await this.journeyRepository.find({
      where: { depStationId: id },
    });
  }

  // Find all with given return station id
  async findTo(id: string) {
    return await this.journeyRepository.find({
      where: { retStationId: id },
    });
  }

  // update(id: number, updateJourneyDto: UpdateJourneyDto) {
  //   return `This action updates a #${id} journey`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} journey`;
  // }
}
