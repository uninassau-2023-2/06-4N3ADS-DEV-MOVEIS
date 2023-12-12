import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {
  transform(array: any[], size: number): any[] {
    if (!array) return [];
    return array.reduce((acc, val, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []; // Inicializa o chunk se ele ainda não existe
      }
      acc[chunkIndex].push(val);
      return acc;
    }, []);
  }
}
