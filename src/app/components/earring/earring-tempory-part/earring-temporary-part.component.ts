import {Component, Input, OnInit} from '@angular/core';
import {EarringPart} from "../../../model/earring-part.model";
import {EarringService} from "../../../service/earring.service";

@Component({
  selector: 'app-earring-temporary-part',
  templateUrl: './earring-temporary-part.component.html',
  styleUrls: ['./earring-temporary-part.component.css']
})
export class EarringTemporaryPartComponent implements OnInit {
  @Input() earringParts!: EarringPart[];
  // @Output() emyEarringParts = new EventEmitter<EarringPart[]>();

  constructor(private earringService: EarringService) {
  }

  ngOnInit(): void {
    // this.updateEarringParts();
  }

  hasTempEarringPart(): boolean {
    return this.earringService.getTempEarringParts().length > 0;
  }

  deleteTempEarringPart(earringPart: EarringPart) {
    this.earringService.deleteEarringPartFromCart(earringPart);
    // this.updateEarringParts();
  }

  updateEarringParts() {
    // let earringParts = this.earringService.getTempEarringParts();
    // this.earringParts = earringParts;
    // this.emyEarringParts.emit(this.earringParts);
  }

}
