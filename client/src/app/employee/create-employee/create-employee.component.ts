import { DepartmentService } from './../../core/services/department.service';
import { Department } from './../../core/models/department';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../../core/models/employee';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../core/services/employee.service';
import { first } from 'rxjs/operators';
import { CustomValidator } from '../../shared/validators/CustomValidator';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  newEmployeeForm: FormGroup;
  submitted = false;
  genders: any[];
  departments: any[];
  designations: any[];
  skills: any[];
  corAddress: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private depService: DepartmentService,
    private messageService: MessageService) { }

  ngOnInit() {
    // init new role form
    this.newEmployeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      mobile: ['', [Validators.required, CustomValidator.mobile]],
      email: ['', [Validators.required, CustomValidator.email]],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      primarySkill: ['', Validators.required],
      address: this.formBuilder.group({
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        area: ['', Validators.required],
        pincode: ['', Validators.required]
      })
    });

        this.genders = [
          { name: 'Male', code: 'male' },
          { name: 'Female', code: 'female' }
        ];

    this.departments = [{}];
    this.designations = [{}];
    this.skills = [{}];
    this.getDepartments();

    // get this from database.
    this.designations = [];
    this.designations.push({ name: 'Software Engineer', code: 'Software Engineer' });
    this.designations.push({ name: 'Project Engineer', code: 'Project Engineer' });
    this.designations.push({ name: 'Project Manager', code: 'Project Manager' });

    this.skills = [];
    this.skills.push({ name: 'Angular', code: 'Angular' });
    this.skills.push({ name: 'Java', code: 'Java' });
    this.skills.push({ name: 'Asp.Net', code: 'Asp.Net' });
    this.skills.push({ name: 'Node.js', code: 'Node.js' });
    this.skills.push({ name: 'JUnit', code: 'JUnit' });
  }

  get newForm() { return this.newEmployeeForm.controls; }

  get addressForm() { return this.newEmployeeForm.controls.address['controls']; }

  getDepartments() {
    this.departments = [];
    this.depService.findAll().subscribe((res) => {
      const departments = res['data'];
      departments.forEach((department, index) => {
        this.departments.push({ name: department.name, code: department.id });
      });
    }, (error) => {
      console.log(error);
    });
  }

  create() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newEmployeeForm.invalid) {
      return;
    }

    const newEmployee = new Employee();
    newEmployee.firstName = this.newForm.firstName.value;
    newEmployee.lastName = this.newForm.lastName.value;
    newEmployee.gender = this.newForm.gender.value.code;
    newEmployee.dob = this.newForm.dob.value;
    newEmployee.email = this.newForm.email.value;
    newEmployee.mobile = this.newForm.mobile.value;
    newEmployee.department = this.newForm.department.value.code;
    newEmployee.designation = this.newForm.designation.value.code;
    newEmployee.primarySkill = this.newForm.primarySkill.value.code;
    newEmployee.address = this.newForm.address.value;

    // clear message items
    this.messageService.clear();
    this.empService.create(newEmployee)
      .pipe(first())
      .subscribe(
        response => {
          const employee: Employee = response['data'];
          if (employee) {
            // clear form
            this.resetForm(this.newEmployeeForm);
            this.messageService.add({
              severity: 'success',
              summary: 'Great!',
              detail: 'Employee created successfully'
            });
          }
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message
          });
        });
  }

  resetForm(form: FormGroup) {
    form.reset();
  }
}
