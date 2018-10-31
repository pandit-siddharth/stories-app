import { Component, OnInit } from '@angular/core';
import { StoriesService } from '../stories.service';
import { appConstants } from '../constant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  stories: any;
  columns: string[];
  modalClass: string;
  displayData: string;
  activeModal: any;
  searchString: any;

  constructor(private atService: StoriesService, private modalService: NgbModal) { }


  openModal(rowData): void {
    this.activeModal = this.modalService.open(ModalComponent, { size: 'lg' });
    this.activeModal.componentInstance.modalData = JSON.stringify(rowData);
    this.activeModal.componentInstance.closeCallback = this.closeModal.bind(this);
  }

  closeModal(): void {
    this.activeModal.close();
  }

  ngOnInit() {
    this.columns = this.atService.getColumns();
    let refresh = function () {
      this.stories = this.atService.getStories();
      setTimeout(refresh, appConstants.interval);
    }.bind(this);
    refresh();
  }
}
