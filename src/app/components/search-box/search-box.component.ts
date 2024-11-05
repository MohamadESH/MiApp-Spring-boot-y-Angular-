import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'component-search-box',
  standalone: true,
  imports: [ButtonModule,InputTextModule,InputGroupAddonModule,InputGroupModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {


  private debouncer: Subject<string>=new Subject<string>();
  private debouncerSuscription?: Subscription;
  public value:string="";

  @Input()
  public placeholder: string ="";
  @Input()
  public initialValue: string ="";
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .subscribe( value => {
      this.onDebounce.emit(value);
    })
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
  }

  emitValue(value:string):void{
    this.onValue.emit(value)
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)
  }

}

