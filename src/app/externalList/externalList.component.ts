import { Component, OnInit } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

//https://stackoverflow.com/questions/37208801/property-map-does-not-exist-on-type-observableresponse
@Component({
    selector: 'external-list',
    // templateUrl: './externalList.component.html',
    template: `
  
   <h1>External list</h1>
  
   <button class="" (click)="makeRequest()">Send Request</button>
   
   <div *ngFor="let movie of movieList">
     {{movie.title}}
   </div>
 `,
    styleUrls: ['./externalList.component.scss']
})

export class ExternalList implements OnInit {
    public movieList;

    constructor(private http: Http, private httpClient: HttpClient) { }

    ngOnInit() { }

    makeRequest() {
        this.http.get("https://swapi.co/api/films/")
            .pipe(
                map((response: Response) => {
                    return response.json();
                })).subscribe(data => {
                    this.movieList = data.results;
                });
        // const url = 'https://mycookbook-io1.p.rapidapi.com/recipes/rapidapi';
        // const headers = {
        //     'x-rapidapi-host': 'mycookbook-io1.p.rapidapi.com',
        //     'x-rapidapi-key': '46189a677amsh69cb5480845f7bfp188182jsnf4e31022feee',
        //     'content-type': 'text/plain',
        //     accept: 'text/plain'
        // };
        // const body = 'https://www.jamieoliver.com/recipes/vegetables-recipes/superfood-salad/';

        // this.httpClient.post(url, body, { headers })
        //     .pipe(
        //         map((response: Response) => {
        //             return response.json();
        //         })).subscribe(data => {
        //             this.movieList = data.results;
        //         });
    }
}



