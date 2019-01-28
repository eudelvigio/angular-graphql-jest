import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HumanWithCarModel } from '../../models/human-with-car/HumanWithCar.model';

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
  FeaturedHumanWithCar: HumanWithCarModel;
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


    const MAX_CAR_YEAR_SUBSCRIPTION = gql`
    subscription maxCarYearSubscription {
      maxCarYearSubscription
    }`;

    this.apollo.subscribe({query: MAX_CAR_YEAR_SUBSCRIPTION}).subscribe((res) => {
      this.MaxCarYear = (res.data.maxCarYearSubscription);
    });


    const FEATURED_HUMAN_WITH_CAR = gql`
    subscription featuredManSubscription {
      featuredManSubscription {
        first_name
        last_name
        carmodel
        caryear
      }
    }`;

    this.apollo.subscribe({query: FEATURED_HUMAN_WITH_CAR}).subscribe((res) => {
      this.FeaturedHumanWithCar = (res.data.featuredManSubscription);
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
        this.humanwithcar = JSON.stringify(result.data['humanWithCar']);
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
