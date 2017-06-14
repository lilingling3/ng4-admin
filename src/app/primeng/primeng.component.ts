import { Component, OnInit } from '@angular/core';

class Demo{
    photo:String;
}

@Component({
  selector: 'app-primeng',
  templateUrl: './primeng.component.html',
  styleUrls: ['./primeng.component.css']
})


export class PrimengComponent implements OnInit {

demo = new Demo();
  photoUrl:string;
  photoFiles: any[] = [];
  constructor() { }

  ngOnInit() {
  }
  onPhotoUpload(event) {
    this.demo.photo = JSON.parse(event.xhr.response).data.name;
    this.photoUrl ="upload/demo/"+this.demo.photo;
        for(let file of event.files) {
            this.photoFiles.push(file);
        }
    }
}
