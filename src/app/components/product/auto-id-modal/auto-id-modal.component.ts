import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDGeneratorService } from './shared/services/id-generator.service';
import { APIResponse } from 'src/app/shared/models/api-response.model';
import { AutomaticID } from './shared/models/automatic-id.model';
declare var $: any;

@Component({
  selector: 'app-auto-id-modal',
  templateUrl: './auto-id-modal.component.html',
  styleUrls: ['./auto-id-modal.component.css'],
  providers: [IDGeneratorService]
})
export class AutoIdModalComponent implements OnInit {

  automatic_id_type:FormControl = new FormControl('');

  @Output() idEvent = new EventEmitter<string>();

  constructor(private idGeneratorService:IDGeneratorService) { }

  ngOnInit(): void {
  }

  getAutomaticID(){

    this.idGeneratorService.getIdByPrefix(this.automatic_id_type.value).subscribe((response:APIResponse<AutomaticID>) => {

      this.idEvent.emit(response.data.nextID);
      $('#automatic_id_modal').modal('hide');
    });
  }
}
