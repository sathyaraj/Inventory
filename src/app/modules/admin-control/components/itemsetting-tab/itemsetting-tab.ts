import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Master } from '../../../../core/services/master';
import { Adminmaster } from '../../../../core/services/adminmaster';

@Component({
  selector: 'app-itemsetting-tab',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './itemsetting-tab.html',
  styleUrl: './itemsetting-tab.css',
})
export class ItemsettingTab {

  constructor(private fb: FormBuilder, private adminMaster: Adminmaster) {}

 @Input() form!: FormGroup;

 ngOnInit(): void {

  this.form = this.fb.group({

    currencycode: [
      '',
      [
        Validators.required,
        Validators.maxLength(10)
      ]
    ],

    currencyname: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],

    symbol: [
      '',
      [
        Validators.required,
        Validators.maxLength(10)
      ]
    ],

    exchangerate: [
      '',
      [
        Validators.required,
        Validators.min(0)
      ]
    ],

    decimalplaces: [ 2,['']],

    status: [
      'Active',
      Validators.required
    ]

  });

}

save() {

  // VALIDATION
  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;
  }

  // FORM DATA
  const payload = {

    id: 0,

    currencyCode: this.form.value.currencycode,

    currencyName: this.form.value.currencyname,

    symbol: this.form.value.symbol,

    exchangeRate: this.form.value.exchangerate,

    decimalPlaces: this.form.value.decimalplaces,

    isDefault: false,

    status: this.form.value.status

  };

  console.log(payload);

  // API CALL
  this.adminMaster.saveCurrency(payload)
    .subscribe({

      next: (res: any) => {

        console.log(res);

        alert('Currency Saved Successfully');

        this.form.reset({

          status: 'Active',
          decimalplaces: 2
        });

      },

      error: (err:any) => {

        console.log(err);

        alert('Save Failed');

      }

    });

}



}
