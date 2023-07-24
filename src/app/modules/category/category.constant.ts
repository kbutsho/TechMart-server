import { ICategoryStatus } from "./category.interface";

export const categoryStatus: ICategoryStatus[] = ["active", "inactive", "coming-soon", "under-review", "discontinue"];
export const categoryFilterableFields = ['search', 'name', 'categoryId'];
export const categorySearchableFields = ['name', 'categoryId'];