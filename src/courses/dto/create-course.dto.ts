import { IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNotEmpty({ message: 'Price is required' })
  price: string;
}
