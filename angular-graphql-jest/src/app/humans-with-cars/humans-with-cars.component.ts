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
  }

  select(id) {
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
