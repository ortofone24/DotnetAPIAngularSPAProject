import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/photo';   // 'src/app/_models/photo' sciezka bezposrednia i posrednia lokalizacja wzgledna ..
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getUserPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  // hasAnotherDropZoneOver: boolean;
  response: string;

  // constructor() {
  //   this.uploader = new FileUploader({
  //     // url: URL,
  //     disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
  //     formatDataFunctionIsAsync: true,
  //     formatDataFunction: async (item) => {
  //       return new Promise((resolve, reject) => {
  //         resolve({
  //           name: item._file.name,
  //           length: item._file.size,
  //           contentType: item._file.type,
  //           date: new Date()
  //         });
  //       });
  //     }
  //   });
  //   this.hasBaseDropZoneOver = false;
  //   // this.hasAnotherDropZoneOver = false;
  //   this.response = '';
  //   this.uploader.response.subscribe(res => this.response = res);
  // }

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertify: AlertifyService) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
        url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingAll = (file) => { file.withCredentials = false; };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      console.log('Sukces, zdjecie ustawione jako glowne');
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // this.getUserPhotoChange.emit(photo.url);
      this.authService.changeUserPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

}
