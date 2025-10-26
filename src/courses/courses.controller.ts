import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Courses, Role } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role['ADMIN'])
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // 1️⃣ create new course
  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Courses | { error: string }> {
    return await this.coursesService.create(createCourseDto);
  }

  // 2️⃣ get all courses
  @Get()
  async findAll(
    @Query('skip', new ParseIntPipe({ optional: true })) skip: number,
  ): Promise<Courses[] | [] | { error: string }> {
    return await this.coursesService.findAll(skip);
  }

  // 3️⃣ get one course
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<Courses | null | { error: string }> {
    return await this.coursesService.findOne(+id);
  }

  // 4️⃣ update course
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Courses | { error: string }> {
    return await this.coursesService.update(+id, updateCourseDto);
  }

  // 5️⃣ delete course
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ message: string } | { error: string }> {
    return await this.coursesService.remove(+id);
  }
}
