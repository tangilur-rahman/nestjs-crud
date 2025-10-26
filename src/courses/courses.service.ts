import { Injectable } from '@nestjs/common';
import { Courses } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // 1️⃣ create new course
  async create(
    createCourseDto: CreateCourseDto,
  ): Promise<Courses | { error: string }> {
    try {
      const newCourse = await this.prisma.courses.create({
        data: {
          name: createCourseDto.name,
          description: createCourseDto.description,
          price: createCourseDto.price,
        },
      });
      return newCourse;
    } catch (error: unknown) {
      console.log(error);
      return { error: 'Error creating course' };
    }
  }

  // 2️⃣ get all courses
  async findAll(skip?: number): Promise<Courses[] | [] | { error: string }> {
    try {
      const allCourses = await this.prisma.courses.findMany({
        skip,
      });
      return allCourses;
    } catch (error) {
      console.log(error);
      return { error: 'Error fetching courses' };
    }
  }

  // 3️⃣ get single course
  async findOne(id: number): Promise<Courses | null | { error: string }> {
    try {
      const course = await this.prisma.courses.findUnique({
        where: { id },
      });
      return course;
    } catch (error) {
      console.log(error);
      return { error: 'Error fetching courses' };
    }
  }

  // 4️⃣ update course
  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<Courses | { error: string }> {
    try {
      const course = await this.prisma.courses.update({
        where: { id },
        data: {
          name: updateCourseDto.name,
          description: updateCourseDto.description,
          price: updateCourseDto.price,
        },
      });
      return course;
    } catch (error) {
      console.log(error);
      return { error: 'Error fetching courses' };
    }
  }

  // 5️⃣ delete course
  async remove(id: number): Promise<{ message: string } | { error: string }> {
    try {
      await this.prisma.courses.delete({ where: { id } });
      return { message: 'Course deleted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'Error deleting course' };
    }
  }
}
