import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamicForm';
  schoolForm: FormGroup;
  constructor( private fb: FormBuilder){
   this.schoolForm =  this.createFormItem('init');
  }

  /**  
   * @param  itemType // For make a dynamic Form 
   * it Can Be init | classRoom | subject 
   * @returns FormGroup
  */

  /* Create Form Item */ 
  createFormItem(itemType:string):FormGroup{
    let formItem = this.fb.group({})
    switch (itemType) {
      case 'init':
        formItem = this.fb.group({
          schoolName: '',
          totalStudentsCount:'',
          classRooms: this.fb.array([])
        })
        break;
        case 'classRoom':
          formItem = this.fb.group({
            studentCount: '',
            classRoomNumber:'',
            subjects: this.fb.array([])
          })
          break;
          case 'subject':
            formItem = this.fb.group({
              subjectName:'',
              subjectLevel:''
            })
    }
    return formItem;
  }
  /* Get Class Room */
  getClassRoom():FormArray{
    return this.schoolForm.get('classRooms') as FormArray;
  }
  /* Add Class Room */
  addClassRoom(){
    this.getClassRoom().push(this.createFormItem('classRoom'))
  }
  /* Delete Class Room */
  deleteClassRoom(claasRoomIndex:number){
    this.getClassRoom().removeAt(claasRoomIndex)
  }
  /* Get Class Room Subjects */
  getClassRoomSubjects(claasRoomIndex:number):FormArray{
    return this.getClassRoom().at(claasRoomIndex).get('subjects') as FormArray;
  }

  /* Add class Room Subjects */
  addClassRoomSubjects(claasRoomIndex:number){
    this.getClassRoomSubjects(claasRoomIndex).push(this.createFormItem('subject'))
  }
  /* Delete Class Room Subjects*/
  deleteClassRoomSubjects(claasRoomIndex: number, subjectIndex: number){
    this.getClassRoomSubjects(claasRoomIndex).removeAt(subjectIndex);

  }
  ngOnInit(): void {      
  }
}
