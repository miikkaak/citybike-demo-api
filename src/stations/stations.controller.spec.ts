import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

const countTodo: number = 0;

describe('StationsController', () => {
  let controller: StationsController;

  const mockedRepo = {
    getCount: jest.fn(() => Promise.resolve(countTodo)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StationsController],
      providers: [
        StationsService,
        {
          provide: getRepositoryToken(Station),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    controller = module.get<StationsController>(StationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
