import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';

import { TRACE_MODULE_CONFIGURATION, ZipkinModule } from '@angular-tracing/zipkin';
import { sampler } from 'zipkin';
import Sampler = sampler.Sampler;

export function getZipkinConfig() {
  return {
    traceProvider: {
      http: {
        remoteServiceMapping: {
          routes: new RegExp('.*')
        }
      },
      zipkinBaseUrl: 'http://localhost:9411',
      // Any from https://github.com/openzipkin/zipkin-js/blob/master/packages/zipkin/src/tracer/sampler.js can be used (see exports)
      sampler: new Sampler(sampler.alwaysSample)
    },
    // Zipkin specific settings not available through angular-tracing go below, see https://github.com/openzipkin/zipkin-js/tree/master/packages/zipkin/
    localServiceName: 'angular-demo',
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    ZipkinModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent
  ],
  providers: [ 
    { provide: TRACE_MODULE_CONFIGURATION, useFactory: getZipkinConfig }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
