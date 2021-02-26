import { Component, OnInit } from '@angular/core';
import { Spacecraft } from 'src/app/models/spacecraft';
import { AuthService } from 'src/app/services/auth.service';
import { SpacecraftService } from "../../services/spacecraft.service";
import { Router } from '@angular/router';
import { GLOBAL } from "../../services/global";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spacecrafts',
  templateUrl: './spacecrafts.component.html',
  styleUrls: ['./spacecrafts.component.css']
})
export class SpacecraftsComponent implements OnInit {
  public title: string;
  public spacecrafts: Spacecraft[];
  public loading: boolean;
  public token: string;
  public page: number;
  public pages: number;
  public total: number;
  public itemsPerPage: number;
  public noMore: boolean;
  public status: string;
  public API_URL: string;
  public closeResult: string;
  public spacecraftSelected: Spacecraft;

  constructor(
    private spacecraftService: SpacecraftService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal

  ) {
    this.title = "Astronaves";
    this.token = this.authService.getToken();
    this.loading = true;
    this.page = 1;
    this.noMore = false;
    this.API_URL = GLOBAL.API_URL;
    this.closeResult = '';
  }

  ngOnInit(): void {
    this.getSpacecrafts(this.page);
  }

  getSpacecrafts(page: number, adding = false) {
    this.spacecraftService.getSpacecrafts(this.token, page)
      .subscribe(
        res => {
          if (res.spacecrafts) {
            this.loading = false;
            this.total = res.total;
            this.pages = res.pages;
            this.itemsPerPage = res.itemsPerPage;

            if (this.pages == 1) {
              this.noMore = true;
            }

            if (!adding) {
              this.spacecrafts = res.spacecrafts;
            } else {
              let arrayA = this.spacecrafts;
              let arrayB = res.spacecrafts;
              this.spacecrafts = arrayA.concat(arrayB);
            }
            if (page > this.pages) {
              this.router.navigate(['/spacecrafts']);
            }
          } else {
            this.loading = false;
            this.status = 'error';
          }

        },
        error => {
          let errorMessage = <any>error;

          if (errorMessage != null) {
            this.status = 'error';
            this.loading = false;
          }
        }
      );

  }

  viewMore() {
    this.page += 1;
    if (this.page == this.pages) {
      this.noMore = true;
    }
    this.getSpacecrafts(this.page, true);
  }

  openNewSpacecraft(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  newSpacecraft(form: any) {
    this.spacecraftService.createSpacecraft(this.token, form.value).subscribe(res => {
      this.modalService.dismissAll();
      this.getSpacecrafts(this.page);
    });
  }

  openDeleteSpacecraft(modal: any, spacecraft: Spacecraft) {
    this.spacecraftSelected = spacecraft;
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteSpacecraft() {
    this.spacecraftService.deleteSpacecraft(this.token, this.spacecraftSelected._id).subscribe(res => {
      this.modalService.dismissAll();
      this.getSpacecrafts(this.page);
    });
  }

}
