import { CommonService } from './../../core/services/common.service';
import { DepartmentService } from './../../core/services/department.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../../core/models/employee';
import { MessageService } from 'primeng/api';
import { EmployeeService } from '../../core/services/employee.service';
import { first } from 'rxjs/operators';
import { CustomValidator } from '../../shared/validators/CustomValidator';
import { Address } from '../../core/models/address';

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
  countries: any[];
  states: any[];
  cities: any[];
  constructor(private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private depService: DepartmentService,
    private messageService: MessageService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.initForm();

    this.genders = [
      { name: 'Male', code: 'male' },
      { name: 'Female', code: 'female' }
    ];

    this.departments = [{}];
    this.designations = [{}];
    this.states = [{}];
    this.cities = [{}];
    this.skills = [{}];
    this.getDepartments();

    // get this from database.
    this.designations = this.commonService.getDesignations();

    this.skills = this.commonService.getSkills();
    this.countries = this.commonService.getAllCountries();
  }

  initForm() {
    // init new role form
    this.newEmployeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
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
        area: ['', [Validators.required, Validators.minLength(10)]],
        pincode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), CustomValidator.number]]
      })
    });
  }

  getStates() {
    if (this.addressForm.country.value !== null) {
      const countryId = this.addressForm.country.value.id;
      if (countryId) {
        this.states = this.commonService.getStatesOfCountry(countryId);
      }
    } else {
      this.states = [];
    }
  }

  getCities() {
    if (this.addressForm.state.value !== null) {
      const stateId = this.addressForm.state.value.id;
      if (stateId) {
        this.cities = this.commonService.getCitiesOfState(stateId);
      }
    } else {
      this.cities = [];
    }
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
    const address = new Address();
    newEmployee.firstName = this.newForm.firstName.value;
    newEmployee.lastName = this.newForm.lastName.value;
    newEmployee.gender = this.newForm.gender.value.code;
    newEmployee.dob = this.newForm.dob.value;
    newEmployee.email = this.newForm.email.value;
    newEmployee.mobile = this.newForm.mobile.value;
    newEmployee.department = this.newForm.department.value.code;
    newEmployee.designation = this.newForm.designation.value.code;
    newEmployee.primarySkill = this.newForm.primarySkill.value.code;

    address.country = this.addressForm.country.value.name;
    address.state = this.addressForm.state.value.name;
    address.city = this.addressForm.city.value.name;
    address.area = this.addressForm.area.value;
    address.pincode = this.addressForm.pincode.value;
    newEmployee.address = address;
    // clear message items
    this.messageService.clear();
    this.empService.create(newEmployee)
      .pipe(first())
      .subscribe(
        response => {
          // clear form
          this.resetForm(this.newEmployeeForm);
          this.messageService.add({
            severity: 'success',
            summary: 'Great!',
            detail: response['message']
          });
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
