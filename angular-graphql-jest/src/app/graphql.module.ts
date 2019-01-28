import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NgModule, Inject, PLATFORM_ID } from '@angular/core';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import {isPlatformBrowser} from '@angular/common';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import * as WebSocket from 'ws';
interface Definition {
  kind: string;
  operation?: string;
}
let browser = false;
export function createApollo(httpLink: HttpLink) {
  // Create an http link:
  const http = httpLink.create({
    uri: 'http://localhost:4000/graphql'
  });
  let wsClient;

  if (browser) {
    wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true
    });
  } else {
    wsClient = new SubscriptionClient('ws://localhost:4000/graphql', {
      reconnect: true
    }, WebSocket);
  }
  // Create a WebSocket link:
  const ws = new WebSocketLink(wsClient);

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation }: Definition = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http,
  );
  return {
    link: link,
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
export class GraphqlModule {
  constructor(@Inject(PLATFORM_ID) platformId) {
    browser = isPlatformBrowser(platformId);
  }
}
