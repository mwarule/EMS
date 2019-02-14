import { CommonService } from './../../core/services/common.service';
import { DepartmentService } from './../../core/services/department.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../../core/models/employee';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmployeeService } from '../../core/services/employee.service';
import { first } from 'rxjs/operators';
import { CustomValidator } from '../../shared/validators/CustomValidator';
import { Address } from '../../core/models/address';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editEmployeeForm: FormGroup;
  submitted = false;
  genders: any[];
  departments: any[];
  designations: any[];
  skills: any[];
  corAddress: FormGroup;
  countries: any[];
  states: any[];
  cities: any[];
  employeeId: any;
  constructor(private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private depService: DepartmentService,
    private messageService: MessageService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.employeeId = params['id'];
    });

    this.initEditForm();

    this.genders = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' }
    ];

    this.departments = [{}];
    this.designations = [{}];
    this.states = [{}];
    this.cities = [{}];
    this.skills = [{}];
    this.getDepartments();

    this.skills = this.commonService.getSkills();
    this.countries = this.commonService.getAllCountries();

    this.countries = this.commonService.getAllCountries();
    this.getEmployeeById(this.employeeId);
  }

  /**
  * Initializes the form
  */
  initEditForm() {
       // init new role form
       this.editEmployeeForm = this.formBuilder.group({
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

  /**
  * Gets the states from a specific country
  */
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

  /**
   * Gets the cities from a specific state
   */
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

  get editForm() { return this.editEmployeeForm.controls; }

  get addressForm() { return this.editEmployeeForm.controls.address['controls']; }

  /**
   * Gets all the departments
   */
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

  /**
   * Updates an employee
   */
  update() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editEmployeeForm.invalid) {
      return;
    }

    const employee = new Employee();
    const address = new Address();
    employee.id = this.employeeId;
    employee.firstName = this.editForm.firstName.value;
    employee.lastName = this.editForm.lastName.value;
    employee.gender = this.editForm.gender.value.code;
    employee.dob = this.editForm.dob.value;
    employee.email = this.editForm.email.value;
    employee.mobile = this.editForm.mobile.value;
    employee.department = this.editForm.department.value.code;
    employee.designation = this.editForm.designation.value.code;
    employee.primarySkill = this.editForm.primarySkill.value.code;

    address.country = this.addressForm.country.value.name;
    address.state = this.addressForm.state.value.name;
    address.city = this.addressForm.city.value.name;
    address.area = this.addressForm.area.value;
    address.pincode = this.addressForm.pincode.value;
    employee.address = address;
    // clear message items
    this.messageService.clear();
    this.empService.update(employee)
      .pipe(first())
      .subscribe(
        response => {
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

  /**
  * Resets the form
  */
  resetForm(form: FormGroup) {
    form.reset();
  }

  /**
  * Gets employee by employeeId
  * @param id
  */
  getEmployeeById(id) {
    this.empService.findById(id)
      .pipe(first())
      .subscribe(
        response => {
          if (!response['data']) {
            this.router.navigate(['/']);
          } else {
            this.displayEmployeeData(response);
          }
        },
        error => {
          console.log(error);
        });
  }

  /**
  * Binds the response data to the form controls
  * @param response
  */
  displayEmployeeData(response) {
    const employee = response['data'];
    const department = employee.departments[0];
    const address = employee.addresses[0];
    const country = this.commonService.getCountryByName(address.country);
    const state = this.commonService.getStateByName(address.state);
    const city = this.commonService.getCityByName(address.city);
    const date = this.datePipe.transform(employee.dob, 'yyyy-MM-dd');
    this.addressForm.country.patchValue(country);
    this.getStates();
    this.addressForm.state.patchValue(state);
    this.getCities();
    this.addressForm.city.patchValue(city);
    this.editEmployeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: { name: employee.gender, code: employee.gender },
      dob: new Date(date),
      email: employee.email,
      mobile: employee.mobile,
      department: { name: department.name, code: department.id },
      designation: { name: employee.designation, code: employee.designation },
      primarySkill: { name: employee.primarySkill, code: employee.primarySkill },
      address: {
        country: country,
        state: state,
        city: city,
        area: address.area,
        pincode: address.pincode
      }
    });
  }

  /**
  * Confirms the employee deletion
  */
  confirmEmployeeDeletion() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this employee ?',
      header: 'Delete Employee',
      icon: 'fa fa-exclamation-triangle',
      accept: () => {
        this.deleteEmployee(this.employeeId);
      },
      reject: () => {
      }
    });
  }

  /**
  * Deletes an employee
  * @param empId
  */
  deleteEmployee(empId) {
    this.messageService.clear();
    this.empService.delete(empId)
      .pipe(first())
      .subscribe(
        response => {
          const data = response['data'];
          const success = response['success'];
          if (success && data) {
            this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Employee deleted successfully' });
            const that = this;
            setTimeout(function () {
              that.router.navigate(['/']);
            }, 2000);
          }
        },
        error => {
          console.log(error);
        });
  }
}
