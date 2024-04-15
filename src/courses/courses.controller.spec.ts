import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Courses } from './entities/courses.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CoursesController', () => {
  let controller: CoursesController;
  const mockCoursesRepository = {
    find: () => [{ id: 1, name: 'Course 1', year: 2024 }],
    findOneBy: ({ id }: { id: string }) => ({
      id: id,
      name: 'Course 1',
      year: 2024,
    }),
    save: ({ name, year }: { name: string; year: number }) => ({
      id: 1,
      name,
      year,
    }),
    delete: () => ({ data: {}, affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Courses],
      controllers: [CoursesController],
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Courses),
          useValue: mockCoursesRepository,
        },
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all courses', async () => {
    const courses = await controller.findAll();
    expect(Array.isArray(courses)).toBeTruthy();
    expect(courses.length).toBe(1);
  });

  it('should find course by id', async () => {
    const course = await controller.findOne('1');
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should create a new course', async () => {
    const course = await controller.create({ name: 'Course 1', year: 2024 });
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should update course', async () => {
    const course = await controller.update('1', {
      name: 'Course 1',
      year: 2024,
    });
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should delete course', async () => {
    const course = await controller.remove('1');
    expect(course).toBeTruthy();
    expect(course.affected).toBe(1);
  });
});
