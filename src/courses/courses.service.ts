import { Injectable } from '@nestjs/common';
import { CreateCoursesDto } from './dto/create-courses.dto';
import { UpdateCoursesDto } from './dto/update-courses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from './entities/courses.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private coursesRepository: Repository<Courses>,
  ) {}

  create(createCoursesDto: CreateCoursesDto) {
    return this.coursesRepository.save(createCoursesDto);
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return this.coursesRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCoursesDto: UpdateCoursesDto) {
    const course = await this.coursesRepository.findOneBy({ id: id });

    if (!course) {
      return null;
    }

    course.name = updateCoursesDto.name;
    course.year = updateCoursesDto.year;

    return this.coursesRepository.save(course);
  }

  remove(id: number) {
    return this.coursesRepository.delete({ id: id });
  }
}
