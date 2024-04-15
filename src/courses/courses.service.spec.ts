import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Courses } from './entities/courses.entity';

describe('CoursesService', () => {
  let service: CoursesService;
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
      providers: [
        CoursesService,
        {
          provide: getRepositoryToken(Courses),
          useValue: mockCoursesRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all courses', async () => {
    const courses = await service.findAll();
    expect(Array.isArray(courses)).toBeTruthy();
    expect(courses.length).toBe(1);
  });

  it('should find course by id', async () => {
    const course = await service.findOne(1);
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should create a new course', async () => {
    const course = await service.create({ name: 'Course 1', year: 2024 });
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should update course', async () => {
    const course = await service.update(1, {
      name: 'Course 1',
      year: 2024,
    });
    expect(course).toBeTruthy();
    expect(course.id).toBe(1);
  });

  it('should delete course', async () => {
    const course = await service.remove(1);
    expect(course).toBeTruthy();
    expect(course.affected).toBe(1);
  });
});
