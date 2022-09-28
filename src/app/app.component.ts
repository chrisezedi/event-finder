import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import events from '../assets/events.json';
import { Event } from './event';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'event-finder';
  events: Event[];
  originalEvents: Event[];
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.events = events;
    this.originalEvents = events;
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    this.eventForm = this.fb.group({
      city: new FormControl(''),
      price: new FormControl(''),
    });
  }

  submit(): void {
    this.events = this.originalEvents;
    const city = this.eventForm.get('city')?.value.toLocaleLowerCase();
    const price = this.eventForm.get('price')?.value;
    let condition = new RegExp(city);

    if (
      this.eventForm.get('city')?.value &&
      !this.eventForm.get('price')?.value
    ) {
      const results = this.originalEvents.filter((event) => {
        return condition.test(event.city.toLocaleLowerCase());
      });

      //order results
      this.events = results.sort((a, b) => a.city.localeCompare(b.city));
    } else if (
      !this.eventForm.get('city')?.value &&
      this.eventForm.get('price')?.value
    ) {
      const results = this.originalEvents.filter((event) => {
        return event.price <= price;
      });

      this.events = results;
    } else {
      const results = this.originalEvents.filter((event) => {
        return (
          condition.test(event.city.toLocaleLowerCase()) && event.price <= price
        );
      });

      this.events = results;
    }
  }
}
