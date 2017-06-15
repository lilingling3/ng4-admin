import { Component, OnInit } from '@angular/core';
import { PrimengService } from './primeng.service';
import {TreeTableModule,TreeNode,SharedModule} from 'primeng/primeng';
import {ConfirmationService} from 'primeng/primeng';
class Demo{
    photo:String;
}

@Component({
  selector: 'app-primeng',
  templateUrl: './primeng.component.html',
  styleUrls: ['./primeng.component.css']
})


export class PrimengComponent implements OnInit {
    // 日历
  dateValue:Date;
  cn:any;
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>
  //上传图片
  demo = new Demo();
  photoUrl:string;
  photoFiles: any[] = [];
   // 树形结构
  files: TreeNode[];
  selectedFile: TreeNode[];

  cols;
  items;
  constructor(
     private primengService:PrimengService,
     private confirmationService: ConfirmationService
  ) { }


  ngOnInit() {

    this.cn = {
            firstDayOfWeek: 1,
            dayNames: [ "周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            dayNamesShort: [ "日", "一", "二", "三", "四", "五", "六", "七" ],
            dayNamesMin: [ "日", "一", "二", "三", "四", "五", "六", "七" ],
            monthNames: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]
        }
        // this.tr = {
        //             firstDayOfWeek : 1
        //         }

        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today,invalidDate];

        // 树形结构
        // this.cols = [
        //         {field: 'dutyMenuId', header: 'dutyMenuId'},
        //         {field: 'dutyId', header: 'dutyId'},
        //         {field: 'menuName', header: 'menuName'},
        //         {field: 'menuId', header: 'menuId'},
        //         {field: 'action', header: 'action'},
        //     ];
        this.cols = [
                {field: 'name', header: 'Name'},
                {field: 'size', header: 'Size'},
                {field: 'type', header: 'Type'},
                {field: '操作', header: '操作'}
            ];
            this.items = [
            {label: '删除', icon: 'fa-search', command: (event) => this.viewNode(this.selectedFile)},
            {label: '编辑', icon: 'fa-close', command: (event) => this.deleteNode(this.selectedFile)}
        ];
        this.primengService.getDutyMenu()
        .then(files => {
             this.files = files
             console.log(files);
            // if(files.errorCode ===  0){
            //     const data = files.content;
            //     //console.log(data)

            //     data.forEach(element => {
            //         // console.log(element)
            //         // console.log("dutyMenu" in element)
            //         if("dutyMenu" in element){
            //             console.log(element.dutyMenu)
            //             this.files = element.dutyMenu;
            //             console.log(this.files)
            //         }
            //     });

            // }


        })


  }

   onPhotoUpload(event) {
        this.demo.photo = JSON.parse(event.xhr.response).data.name;
        this.photoUrl ="upload/demo/"+this.demo.photo;
            for(let file of event.files) {
                this.photoFiles.push(file);
            }
    }

    paginate(event) {
            //event.first = Index of the first record  从0 开始
            //event.rows = Number of rows to display in new page
            //event.page = Index of the new page
            //event.pageCount = Total number of pages
       console.log(event)
    }

   nodeSelect(event){
       console.log(event)
       console.log(event.node)
   }
   nodeUnselect(event){
       console.log(event)
   }

   viewNode(node: TreeNode) {
        // this.msgs = [];
        // this.msgs.push({severity: 'info', summary: 'Node Selected', detail: node.data.name});
    }

    deleteNode(node: TreeNode) {
        //node.parent.children = node.parent.children.filter( n => n.data !== node.data);
        // this.msgs = [];
        // this.msgs.push({severity: 'info', summary: 'Node Deleted', detail: node.data.name});
    }

    confirm1() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            accept: () => {
                // this.msgs = [];
                // this.msgs.push({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            }
        });
    }

    confirm2() {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                // this.msgs = [];
                // this.msgs.push({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            }
        });
    }
}
