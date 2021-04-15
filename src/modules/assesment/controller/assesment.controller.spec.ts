import { Test, TestingModule } from '@nestjs/testing';
import { AssesmentController } from './assesment.controller';
import { AssesmentService } from '../service/assesment.service';

describe('AssesmentController', () => {
  let controller: AssesmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssesmentController],
      providers: [AssesmentService],
    }).compile();

    controller = module.get<AssesmentController>(AssesmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
