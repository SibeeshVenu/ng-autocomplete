import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autocompleteFilter'
})
export class AutocompleteFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, labelKey?: string): any {
    if (!items || !searchText) { return items };
    return items.filter(item => item[labelKey || 'label'].toLowerCase()
      .includes(searchText.toLowerCase()) === true);
  }

}
