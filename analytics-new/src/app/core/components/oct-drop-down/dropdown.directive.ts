import { ElementRef, Directive, OnDestroy, OnInit, Renderer, HostListener} from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import { TOGGLE_STATUS, DropDownValues} from './toggle-status';


@Directive({
  selector: '[dropdown]',
  exportAs: 'dropdown'
})

export class DropdownDirective {
  private status: TOGGLE_STATUS = TOGGLE_STATUS.ClOSE;
  private closeStatus$: Subject<DropDownValues> = new Subject<DropDownValues>();

  constructor(private elementRef: ElementRef, private renderer: Renderer){

  }

  setActive(active = true){
    this.renderer.setElementClass(this.elementRef.nativeElement, 'active', active);
  }

  toggle() {
    if (this.status === TOGGLE_STATUS.OPEN){
      this.close();
    }else {
      this.open();
    }
  }

  open() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', true);
    if (this.status !== TOGGLE_STATUS.OPEN){
      const obj = {value: null, status: TOGGLE_STATUS.OPEN};
      this.closeStatus$.next(obj);
    }
    this.status = TOGGLE_STATUS.OPEN;
  }

  close(target = null) {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'open', false);
    if (this.status !== TOGGLE_STATUS.ClOSE){
      let obj = {value: null, status: TOGGLE_STATUS.ClOSE}
      if (target){
        obj = {value: target.innerHTML, status: TOGGLE_STATUS.ClOSE};
      }

      this.closeStatus$.next(obj);
    }
    this.status = TOGGLE_STATUS.ClOSE;
  }

  statusChange(): Observable<DropDownValues> {
    return this.closeStatus$.asObservable();
  }
}
