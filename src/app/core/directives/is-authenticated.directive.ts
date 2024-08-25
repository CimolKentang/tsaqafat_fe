import { Directive } from '@angular/core';

@Directive({
  selector: '[appIsAuthenticated]',
  standalone: true
})
export class IsAuthenticatedDirective {

  constructor() { }

}
