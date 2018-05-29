import {Directive, ElementRef, OnDestroy, OnInit, Host} from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeUntil';
import { TOGGLE_STATUS, DropDownValues} from './toggle-status';
import { DropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[dropdownMenu]',
  exportAs: 'dropdownMenu'
})

export class DropdownMenuDirective implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor( @Host() public dropdown: DropdownDirective, private elementRef: ElementRef){

  }
  ngOnInit(){
    this.dropdown.statusChange().takeUntil(this.ngUnsubscribe)
      .subscribe((newStatus: DropDownValues) => {
        if (newStatus.status === TOGGLE_STATUS.OPEN){
           document.addEventListener('click', this.onDocumentClick.bind(this), true);
        }else{
          document.removeEventListener('click', this.onDocumentClick, true);
        }
      });
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    document.removeEventListener('click', this.onDocumentClick, true);
  }

  onDocumentClick(event: MouseEvent){
    const target: EventTarget = event.target;
    if (target instanceof HTMLElement && target.hasAttribute('dropdownToggle')){
      return;
    }

    const insideClick = this.elementRef.nativeElement.contains(target);
    if (!insideClick){
      this.dropdown.close();
    }else{
      this.dropdown.close(target);
    }
  }
}
