import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ReadStationDto } from './dto/read-station.dto';
import { Station } from './entities/station.entity';
import { StationsService } from './stations.service';

const countNumber: number = 1;
const oneStation: ReadStationDto = plainToInstance(ReadStationDto, {
  fid: 1,
  id: 1,
  name: 'test',
  nameFI: 'test',
  nameSWE: 'test',
  addressFI: 'test',
  addressSWE: 'test',
  city: 'test',
  lat: '60.4040',
  lon: '24.64356',
});

describe('StationsService', () => {
  let service: StationsService;

  const mockedRepo = {
    findOne: jest.fn(() => Promise.resolve(oneStation)),
    getCount: jest.fn(() => Promise.resolve(countNumber)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationsService,
        {
          provide: getRepositoryToken(Station),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    service = module.get<StationsService>(StationsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a station', async () => {
      const findAllSpy = jest.spyOn(mockedRepo, 'findOne');

      const arr = await service.findOne(oneStation.id);

      expect(arr).toEqual(oneStation);
      expect(findAllSpy).toHaveBeenCalledTimes(1);
    });
  });
});
