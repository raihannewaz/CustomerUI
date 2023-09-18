import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent {
  breadCrumb$?: Observable<any[]>;
constructor(private bService:BreadcrumbService){}

ngOnInit(){
  this.breadCrumb$= this.bService.breadcrumbs$;
}
}
