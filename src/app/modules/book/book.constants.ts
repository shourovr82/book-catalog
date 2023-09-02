export const booksFilterableFields: string[] = ['title', 'author', 'genre'];

export const booksSearchableFields: string[] = ['title', 'author', 'genre'];

export const booksRelationalFields: string[] = ['categoryId'];
export const booksRelationalFieldsMapper: { [key: string]: string } = {
  category: 'category',
};
