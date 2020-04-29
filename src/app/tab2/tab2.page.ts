import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, Platform, ModalController } from "@ionic/angular";
import { SharedService } from '../api/shared/shared.service';
import { NotificationPage } from '../notification/notification.page';
import { myEnterAnimation } from '../animations/enter';
import { myLeaveAnimation } from '../animations/leave';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  unsubscribeBackEvent;
  bdarkmode: boolean;
  modal;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private sharedService: SharedService,
    private platform: Platform,
    private modalController: ModalController
  ) {}
  async onClick() {
    const alert = await this.alertController.create({
      header: "Logout",
      subHeader: "",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Logout",
          handler: () => {
            this.sharedService.logOut();
          },
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancelled");
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnInit(): void {
    var isdarkMode = localStorage.getItem("darkmode");
    this.bdarkmode = localStorage.getItem("darkmode") == "true" ? true : false;
    console.log(this.bdarkmode);
    // this.setDarkMode(this.bdarkmode);
  }

  ionViewWillEnter() {
    this.initializeBackButtonCustomHandler();
  }

  setDarkMode(data) {
    document.body.classList.toggle("dark", data);
    // document.body.classList.toggle("dark", ev.detail.checked);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  }

  darkMode(ev) {
    console.log("event is " + ev.detail.checked);
    localStorage.setItem("darkmode", ev.detail.checked);
    document.body.classList.toggle("dark", ev.detail.checked);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      ev.detail.checked = shouldCheck;
    }
  }

  ngAfterViewChecked(): void {}

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: "Delete Account",
      subHeader: "",
      message: "All the data related to this account will be permanently removed.Please note, It take time to complete the delete process. ",
      buttons: [
        {
          text: "Delete",
          handler: () => {
            this.sharedService.deleteUser();
            this.router.navigate(["login"]);
          },
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Cancelled");
          },
        },
      ],
    });

    await alert.present();
  }
  initializeBackButtonCustomHandler(): void {
    this.unsubscribeBackEvent = this.platform.backButton.subscribeWithPriority(
      999999,
      async () => {
        if(this.modal){
          this.modal.dismiss();
        }
        // this.router.navigate(["/tabs/enteries"]);
        this.router.navigate(["/tabs"]);
        // alert("Do you want to exit app?");
      }
    );
  }
  ionViewWillLeave() {
    if (this.modal) {
      this.modal.dismiss();
    }
    // Unregister the custom back button action for this page
    this.unsubscribeBackEvent.unsubscribe();
  }

  async openNotificationModal() {
    this.modal = await this.modalController.create({
      component: NotificationPage,
      backdropDismiss: true,
      enterAnimation: myEnterAnimation,
      leaveAnimation: myLeaveAnimation,
    });
    return await this.modal.present();
  }
}
