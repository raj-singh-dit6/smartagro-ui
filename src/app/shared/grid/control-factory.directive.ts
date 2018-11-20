import { CommonModule } from '@angular/common';
import { 
  Directive, 
  NgModule, 
  Component, 
  ComponentFactory, 
  OnChanges, 
  Input, 
  ViewContainerRef,
  Compiler,
  ComponentFactoryResolver
 } from '@angular/core';


@Directive({
  selector: '[ctrl-factory]'
})
export class ControlFactoryDirective implements OnChanges {
  @Input() model: any;
  @Input() record: any;
  @Input() grid : any;
  @Input() col: any;
  @Input() rowNumber : any;
  @Input() data : any;
  componentRef;
  init = false;

  constructor(
    private vcRef: ViewContainerRef, 
    private resolver: ComponentFactoryResolver) { }

  create(comp) {
    const factory = this.resolver.resolveComponentFactory(comp);
    const compRef = this.vcRef.createComponent(factory);

    (<any>compRef).instance.model = this.model;
    (<any>compRef).instance.record = this.record;
    (<any>compRef).instance.grid = this.grid;
    (<any>compRef).instance.rowNumber = this.rowNumber;
    (<any>compRef).instance.col = this.col;
    (<any>compRef).instance.data = this.data;

    if (this.componentRef) {
      this.componentRef.destroy();
    }

    this.componentRef = compRef;
    this.init = true;
  }

  ngOnChanges(changes) {
    if (!this.model || this.init) return;
    const comp = this.model;
    if(comp) {
      this.create(comp);
    }
  }
  public ngOnDestroy(){
    if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
    }
  }
}
