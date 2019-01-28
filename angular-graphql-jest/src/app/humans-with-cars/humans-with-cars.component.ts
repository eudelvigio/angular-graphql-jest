import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-humans-with-cars',
  templateUrl: './humans-with-cars.component.html',
  styleUrls: ['./humans-with-cars.component.sass']
})
export class HumansWithCarsComponent implements OnInit {
  loading = true;
  error: any;
  ids: any;
  humanwithcar: any;
  selectedId;
  MaxCarYear = 1990;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            humansWithCars {
              id
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.ids = result.data['humansWithCars'];
        this.loading = result.loading;
        this.error = result.errors;
      });


    const COMMENTS_SUBSCRIPTION = gql`
    subscription maxCarYearSubscription {
      maxCarYearSubscription
    }`;

    this.apollo.subscribe({query: COMMENTS_SUBSCRIPTION}).subscribe((res) => {
      this.MaxCarYear = (res.data.maxCarYearSubscription);
    });
  }

  increment() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          incrementYearOfCar(id:${this.selectedId}){
              id
              caryear
            }
        }
      `
    }).subscribe();
  }

  select(id) {
    this.selectedId = id;
    this.apollo
      .watchQuery({
        query: gql`
          {
            humanWithCar(id:${id}) {
              id
              first_name
              last_name
              caryear
              carmodel
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log('asdfasdfasdf');
        this.humanwithcar = JSON.stringify(result.data['humanWithCar']);
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
