import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stateToHumanReadable"
})
export class stateToHumanReadable implements PipeTransform {
  transform(value: string): string {
    return value == "S" ? "Activo" : "Inactivo";
  }
}
