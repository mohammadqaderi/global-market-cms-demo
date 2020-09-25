export class CategoryDto {
  name: string;
  description: string;
}

export class SubCategoryDto {
  name: string;
  description: string;
  references: number[];
}
