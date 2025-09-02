import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWithChildren'
})
export class FilterWithChildrenPipe implements PipeTransform {

  transform(items: any[], searchText: string, childProperty: string): any[] {
    if (!items || !searchText) return items;

    const searchTextLower = searchText.toLowerCase();

    return items
      .map((item) => {
        // Check if parent item matches
        const parentMatches = Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTextLower);

        // Filter child items if any
        const childMatches = item[childProperty]?.filter((childItem: any) =>
          Object.values(childItem)
            .join(' ')
            .toLowerCase()
            .includes(searchTextLower)
        );

        if (parentMatches || (childMatches && childMatches.length > 0)) {
          return {
            ...item,
            [childProperty]: childMatches, // Keep only matched child items
          };
        }
        return null; // Exclude item if neither parent nor children match
      })
      .filter((item) => item !== null); // Remove null items
  }

}
