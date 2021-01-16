import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocompleteFilter'
})
export class AutocompleteFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, title?: string): any {
    if (!items || !searchText) { return items };
    return items.filter(item => item[title || 'title'].toLowerCase()
      .includes(searchText.toLowerCase()) === true);
  }

}
