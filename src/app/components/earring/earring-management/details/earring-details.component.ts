import {Component, OnInit} from '@angular/core';
import {EarringService} from "../../../../service/earring.service";
import {ActivatedRoute} from "@angular/router";
import {Earring} from "../../../../model/earring.model";
import {UtilitiesService} from "../../../../service/utilities.service";

@Component({
  selector: 'app-earring-details',
  templateUrl: './earring-details.component.html',
  styleUrls: ['./earring-details.component.css']
})
export class EarringDetailsComponent implements OnInit {

  earring!: Earring;

  constructor(private earringService: EarringService, private route: ActivatedRoute, public utilities: UtilitiesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      if (id) {
        this.earringService.getEarring(id)
          .subscribe(
            earring => {
              this.earring = earring;
            }
          );
      }
    });
  }

  previousState() {
    window.history.back();
  }

}
