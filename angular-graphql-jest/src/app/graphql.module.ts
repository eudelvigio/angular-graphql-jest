import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NgModule } from '@angular/core';
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: 'http://localhost:4000/graphql'}),
    cache: new InMemoryCache(),
  };
}
@NgModule({
  imports: [
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ]
})
export class GraphqlModule { }
