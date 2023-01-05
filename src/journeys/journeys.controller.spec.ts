import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';

const countTodo: number = 0;

describe('JourneysController', () => {
  let controller: JourneysController;

  const mockedRepo = {
    getCount: jest.fn(() => Promise.resolve(countTodo)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [
        JourneysService,
        {
          provide: getRepositoryToken(Journey),
          useValue: mockedRepo,
        },
      ],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
