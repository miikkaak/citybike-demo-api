import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ReadJourneyDto } from './dto/read-journey.dto';
import { Journey } from './entities/journey.entity';
import { JourneysService } from './journeys.service';

interface JourneysQuery {
  take: number;
  page: number;
  skip: number;
}

const countNumber: number = 0;
const journeyQuery: JourneysQuery = { take: 1, page: 1, skip: 0 };
const oneJourney: ReadJourneyDto[] = plainToInstance(ReadJourneyDto, [
  {
    id: '1',
    depStationName: 'test',
    retStationName: 'test',
    distance: 0,
    duration: 0,
  },
]);

describe('JourneysService', () => {
  let service: JourneysService;

  const mockedRepo = {
    findAll: jest.fn(() => Promise.resolve(oneJourney)),
    getCount: jest.fn(() => Promise.resolve(countNumber)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysService,
        {
          provide: getRepositoryToken(Journey),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of journeys', async () => {
      const findAllSpy = jest.spyOn(mockedRepo, 'findAll');

      const arr = await service.findAll(journeyQuery);

      expect(arr).toEqual(oneJourney);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(findAllSpy).toHaveBeenCalledWith(journeyQuery);
    });
  });
});
