import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {map} from "rxjs/operators";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  
  
  api_key = '995e7280de9e48c79439af57b3edd3d1';
  

  constructor(private http:HttpClient) { }


  initSources(){
	 return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  }
  
  initArticless(country){
        return this.http.get('https://newsapi.org/v2/top-headlines?country='+country+'&apiKey='+this.api_key);
  }    
  /*initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }*/
  getIP() {
    return this.http.get("https://geo.ipify.org/api/v1?apiKey=at_xWQ0dpwBcDHyATH92MJMPuwkPUvAW");
 }
    initArticles() {
      //return this.http.get('http://54.158.52.73/news/assets/data.json');
     return this.http.get('https://doryunger.com/news/assets/data.json');
     //return this.http.get('http://localhost:5001/assets/data.json');
 }
 
  getCountry(url){
  return this.http.get(url);
  }
    getArticlesByID(input: string) {
        return this.http.get('https://doryunger.com/api/newsrooms/' + input);
        //return this.http.get('http://54.158.52.73/news/assets/data.json');
        //return this.http.get('https://localhost:5001/assets/data.json');
        //return this.http.get('http://doryunger.com/news/assets/data.json');
   }
    getArticlesByCountry(input:string) {
        return this.http.get('https://doryunger.com/api/newsrooms/' + input);
        //return this.http.get('http://54.158.52.73/news/assets/data.json');
        //return this.http.get('http://localhost:5001/assets/data.json');
       //return this.http.get('https://doryunger.com/news/assets/data.json');
   }
  getArticlesByKeywords(text:string){
    return this.http.get('https://gnews.io/api/v3/search?q='+text+'&token=6b401c6d36e699b6da0cda76f9da4855');
  }
  apitst(input:string){
      //return this.http.get('https://doryunger.com/api/newsrooms');
      return this.http.get('https://doryunger.com/api/newsrooms/'+input);
  }
  



}
