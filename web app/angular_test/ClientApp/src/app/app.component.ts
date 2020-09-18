import { Component, ViewChild, ElementRef,HostListener,AfterViewInit } from '@angular/core';
import { NewsApiService } from './news-api.service';
import {Router} from "@angular/router"
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog, MatDialogModule} from "@angular/material";
import {ShareDialogComponent } from './share-dialog/share-dialog.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ShepherdService } from 'angular-shepherd';
import {CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
	
	mArticles:Array<any>;
	mSources:Array<any>;
	//mSourceList:Array<any>;
	mCountries=[{"id":'us',"name":"USA"},{"id":'cn',"name":"China"},{"id":'gb',"name":"Great Britain"},{"id":'ch',"name":'Switzerland'},{"id":'de',"name":"Germany"},{"id":'ru',"name":"Russia"},{"id":'au',"name":"Australia"},{"id":'br',"name":"Brazil"},{"id":'il',"name":"Israel"},{"id":'ae',"name":"UAE"}];
	mSourceList=[{"id":"cnn","name":"CNN"},{"id":"fox-news","name":"Fox News"},{"id":"nbc-news","name":"NBC News"},{"id":"al-jazeera-english","name":"Al Jazeera English"},{"id":"bloomberg","name":"Bloomberg"},{"id":"techcrunch","name":"TechCrunch"},{"id":"independent","name":"Independent"},{"id":"the-washington-post","name":"The Washington Post"},{"id":"time","name":"Time"},{"id":"crypto-coins-news","name":"Crypto Coins News"}]
	ipAddress:string;
	clicked=false;
	countryCode:string;
	status:string;
	selected: string;
	shareurl:string;
	showSpinner=false;
	inList=false;
	disabled=true;
	warningOn=false;
	private cookieValue='newsroom';
	lastUpdate:string;

	defaultStepOptions={
		classes: 'custom-class-name-1 custom-class-name-2',
		scrollTo: false,
		cancelIcon: {
		  enabled: true
		}
	  };

	
	constructor(private newsapi:NewsApiService,private router: Router,public dialog: MatDialog,library: FaIconLibrary,private shepherdService: ShepherdService, private cookieService:CookieService){
		library.addIconPacks(fas);
		//console.log('app component constructor called');  

	}
	
	ngAfterViewInit() {
		if (!this.cookieService.get(this.cookieValue)){
			this.cookieService.set(this.cookieValue,this.cookieValue,365);
			this.shepherdService.defaultStepOptions = this.defaultStepOptions;
			this.shepherdService.modal = true;
			this.shepherdService.confirmCancel = false;
			this.shepherdService.requiredElements = [
				{
				  selector: '#sideOpen',
				  message: 'No search results found. Please execute another search, and try to start the tour again.',
				  title: 'No results'
				},
			  ];
			let width=window.innerWidth;
			if (width>500){
			this.shepherdService.addSteps([
				{
					id: 'intro',
					attachTo: { 
					  element: '#help'
					},
					beforeShowPromise: function() {
					  return new Promise(function(resolve) {
						setTimeout(function() {
						  window.scrollTo(0, 0);
						  resolve();
						}, 500);
					  });
					},
					buttons: [
					  /*{
						classes: 'shepherd-button-secondary',
						text: 'Exit',
						type: 'cancel'
					  },*/
					  /*{
						classes: 'shepherd-button-primary',
						text: 'Back',
						type: 'back'
					  },*/
					  {
						classes: 'shepherd-button-primary',
						text: 'Next',
						type: 'next'
					  }
					],
					cancelIcon: {
					  enabled: false
					},
					//classes: 'custom-class-name-1 custom-class-name-2',
					highlightClass: 'highlight',
					scrollTo: false,
					title: 'Welcome to NewsRoom!',
					text: ["NewsRoom is an Angular application that allows users to browse through news headlines from various countries and notables new sources."],
				  },
				{
				  id: 'menu',
				  attachTo: { 
					element: '#sideOpen', 
					on: 'bottom'
				  },
				  beforeShowPromise: function() {
					return new Promise(function(resolve) {
					  setTimeout(function() {
						window.scrollTo(0, 0);
						resolve();
					  }, 500);
					});
				  },
				  buttons: [
					/*{
					  classes: 'shepherd-button-secondary',
					  text: 'Exit',
					  type: 'cancel'
					},*/
					/*{
					  classes: 'shepherd-button-primary',
					  text: 'Back',
					  type: 'back'
					},*/
					{
					  classes: 'shepherd-button-primary',
					  text: 'Next',
					  type: 'next'
					}
				  ],
				  cancelIcon: {
					enabled: false
				  },
				  //classes: 'custom-class-name-1 custom-class-name-2',
				  highlightClass: 'highlight',
				  scrollTo: false,
				  title: 'Side Menu',
				  text: ["Use this menu for choosing the source of the headlines (country/news agency) like in the example below","<img src='https://i.imgur.com/Ecwf6SM.gif'></img>"],
				},
				{
					id: 'search',
					attachTo: { 
						element: '.search', 
						on: 'bottom'
						},
					beforeShowPromise: function() {
						return new Promise(function(resolve) {
						setTimeout(function() {
							window.scrollTo(0, 0);
							resolve();
							 }, 500);
						});
					},
					buttons: [
					//{
							/*classes: 'shepherd-button-secondary',
							  text: 'Exit',
							  type: 'cancel'
							},*/
							/*{
							  classes: 'shepherd-button-primary',
							  text: 'Back',
							  type: 'back'
							},*/
							{
							  classes: 'shepherd-button-primary',
							  text: 'Next',
							  type: 'next'
							}
						  ],
						  cancelIcon: {
							enabled: false
						  },
						  //classes: 'custom-class-name-1 custom-class-name-2',
						  highlightClass: 'highlight',
						  scrollTo: false,
						  title: 'Search Bar',
						  text: ["The search bar allows you to receive headlines by specific keywords"],
						},
				{
				id: 'share',
				  attachTo: { 
					element: '#share', 
					on: 'top'
				  },
				  beforeShowPromise: function() {
					return new Promise(function(resolve) {
					  setTimeout(function() {
						window.scrollTo(0, 0);
						resolve();
					  }, 500);
					});
				  },
				  buttons: [
					/*{
					  classes: 'shepherd-button-secondary',
					  text: 'Exit',
					  type: 'cancel'
					},*/
					/*{
					  classes: 'shepherd-button-primary',
					  text: 'Back',
					  type: 'back'
					},*/
					{
					  classes: 'shepherd-button-primary',
					  text: 'Next',
					  type: 'next'
					}
				  ],
				  cancelIcon: {
					enabled: false
				  },
				  //classes: 'custom-class-name-1 custom-class-name-2',
				  highlightClass: 'highlight',
				  scrollTo: false,
				  title: 'Share Button',
				  text: ["Opens up a share menu"],
				},
				{
					id: 'view',
					  attachTo: { 
						element: '#view', 
						on: 'top'
					  },
					  beforeShowPromise: function() {
						return new Promise(function(resolve) {
						  setTimeout(function() {
							window.scrollTo(0, 0);
							resolve();
						  }, 500);
						});
					  },
					  buttons: [
						/*{
						  classes: 'shepherd-button-secondary',
						  text: 'Exit',
						  type: 'cancel'
						},*/
						/*{
						  classes: 'shepherd-button-primary',
						  text: 'Back',
						  type: 'back'
						},*/
						{
						  classes: 'shepherd-button-primary',
						  text: 'Done',
						  type: 'next'
						}
					  ],
					  cancelIcon: {
						enabled: false
					  },
					  //classes: 'custom-class-name-1 custom-class-name-2',
					  highlightClass: 'highlight',
					  scrollTo: false,
					  title: 'View Button',
					  text: ["Opens the article in a new tab"],
					},
			  ]);
			}
			else{
				this.shepherdService.addSteps([
				{
					id: 'intro',
					attachTo: { 
					  element: '#help'
					},
					beforeShowPromise: function() {
					  return new Promise(function(resolve) {
						setTimeout(function() {
						  window.scrollTo(0, 0);
						  resolve();
						}, 500);
					  });
					},
					buttons: [
					  /*{
						classes: 'shepherd-button-secondary',
						text: 'Exit',
						type: 'cancel'
					  },*/
					  /*{
						classes: 'shepherd-button-primary',
						text: 'Back',
						type: 'back'
					  },*/
					  {
						classes: 'shepherd-button-primary',
						text: 'Next',
						type: 'next'
					  }
					],
					cancelIcon: {
					  enabled: false
					},
					//classes: 'custom-class-name-1 custom-class-name-2',
					highlightClass: 'highlight',
					scrollTo: false,
					title: 'Welcome to NewsRoom!',
					text: ["NewsRoom is an Angular application that allows users to browse through news headlines from various countries and notables new sources."],
				  },
				{
				  id: 'menu',
				  attachTo: { 
					element: '#sideOpen', 
					on: 'bottom'
				  },
				  beforeShowPromise: function() {
					return new Promise(function(resolve) {
					  setTimeout(function() {
						window.scrollTo(0, 0);
						resolve();
					  }, 500);
					});
				  },
				  buttons: [
					/*{
					  classes: 'shepherd-button-secondary',
					  text: 'Exit',
					  type: 'cancel'
					},*/
					/*{
					  classes: 'shepherd-button-primary',
					  text: 'Back',
					  type: 'back'
					},*/
					{
					  classes: 'shepherd-button-primary',
					  text: 'Next',
					  type: 'next'
					}
				  ],
				  cancelIcon: {
					enabled: false
				  },
				  //classes: 'custom-class-name-1 custom-class-name-2',
				  highlightClass: 'highlight',
				  scrollTo: false,
				  title: 'Side Menu',
				  text: ["Use this menu for choosing the source of the headlines (country/news agency) like in the example below","<img src='https://i.imgur.com/Ecwf6SM.gif'></img>"],
				},
				{
					id: 'search',
					attachTo: { 
						element: '.search', 
						on: 'bottom'
						},
					beforeShowPromise: function() {
						return new Promise(function(resolve) {
						setTimeout(function() {
							window.scrollTo(0, 0);
							resolve();
							 }, 500);
						});
					},
					buttons: [
					//{
							/*classes: 'shepherd-button-secondary',
							  text: 'Exit',
							  type: 'cancel'
							},*/
							/*{
							  classes: 'shepherd-button-primary',
							  text: 'Back',
							  type: 'back'
							},*/
							{
							  classes: 'shepherd-button-primary',
							  text: 'Done',
							  type: 'next'
							}
						  ],
						  cancelIcon: {
							enabled: false
						  },
						  //classes: 'custom-class-name-1 custom-class-name-2',
						  highlightClass: 'highlight',
						  scrollTo: false,
						  title: 'Search Bar',
						  text: ["The search bar allows you to receive headlines by specific keywords"],
						},
			  ]);
			}
			this.shepherdService.start();
			}
		  }

	ngOnInit() {
		this.status='countries';
	
		this.newsapi.getIP().subscribe((res:any)=>{  	
			//this.ipAddress=res.ip;
			this.countryCode=res['location']['country'].toLowerCase();
			console.log(this.countryCode);
				for (let i=0;i<this.mCountries.length;i++){
					if(this.mCountries[i]['id']==this.countryCode){
						this.inList=true;
						if(i!==0){
							[this.mCountries[0],this.mCountries[i]]=[this.mCountries[i],this.mCountries[0]];
							
						}
					}
				}
				if(this.inList==false){
					this.countryCode='us';
					
				}
			this.router.navigate(['/' + this.countryCode]);
			this.newsapi.apitst(this.countryCode).subscribe(data => {
				let json = JSON.parse(JSON.stringify(data));
				this.lastUpdate = json['update'];
				let json_data = JSON.parse(json['data']);
				let articles = json_data['articles'];
				this.mArticles = articles;
			});
					/*this.newsapi.initArticles().subscribe(data => {this.mArticles = data[this.countryCode]['articles'];
					this.lastUpdate=data['update'];
					
					});*/
				});
			  
			  this.mSources=this.mCountries;
			 	
			  

    }
	setStatus(arg:any){
		this.status=arg;
		if (arg=='countries'){
			this.mSources=this.mCountries;
			
		}
		else{
			this.mSources=this.mSourceList;
		
		}
	}
	
	searchArticles(set,source){
		set=this.status;
		if (set=='countries'){
			//this.showSpinner=true;

			this.newsapi.getArticlesByCountry(source).subscribe(data => {
				let json = JSON.parse(JSON.stringify(data));
				if (this.lastUpdate == "") {
					this.lastUpdate = json['update'];
				}
				let json_data = JSON.parse(json['data']);
				let articles = json_data['articles'];
				this.mArticles = articles;
			});

			/*this.newsapi.getArticlesByCountry().subscribe(data => {this.mArticles = data[source]['articles']
			if(this.lastUpdate==""){
				this.lastUpdate=data['update'];
			
		});*/
			//this.mSourcesmSources=this.mSourceList;
		}
		else{
			this.newsapi.getArticlesByID(source).subscribe(data => {
				let json = JSON.parse(JSON.stringify(data));
				if (this.lastUpdate == "") {
					this.lastUpdate = json['update'];
				}
				let json_data = JSON.parse(json['data']);
				let articles = json_data['articles'];
				this.mArticles = articles;
			});

		}
		//console.log("selected source is: "+source);
		
	}
	serachByterm(keywords,div){
		this.disabled=true;
		keywords=keywords.replace(',','%20');
		this.newsapi.getArticlesByKeywords(keywords).subscribe((res:any)=>{
			if (res["articleCount"]>0){
				for(let i=0;i<res['articles'].length;i++){
						res['articles'][i]['urlToImage']=res['articles'][i]['image'];
				}
				
				this.router.navigate(['/']);
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				this.mArticles = res['articles'];
				this.lastUpdate="";
				this.disabled=false;
			}
			else{
				if(div.style.display==''||div.style.display=='none'){
					this.fadeDiv(div,'serach');
				}
			}
		})
			
	}
	openDialog(dict){
		let links={};
		var english = /^[a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -]*$/;
		if (!english.test(dict.title)){
			links['Twitter']= 'https://twitter.com/share?url='+dict.url;
		}
		else{
			links['Twitter']= 'https://twitter.com/share?url='+dict.url+'&text='+dict.title;
		}
		links['WhatsApp']='https://wa.me/?text='+dict.title+dict.url;
		links['Facebook']='https://www.facebook.com/sharer.php?u='+dict.url;
		links['LinkedIn']='https://www.linkedin.com/shareArticle?url='+dict.url+'&title='+dict.title;
		links['URL']=dict.url;
		this.dialog.open(ShareDialogComponent,{data:{links}});
	};
	fadeDiv(inputdiv,context){
		if (context=='serach'){
			inputdiv.innerText="Search returned no results";
			inputdiv.style.backgroundColor='#ffffffca';
  			inputdiv.style.color='#030303';
			
		}
		else{
			inputdiv.innerText="Please use ',' as separator";
			inputdiv.style.backgroundColor='#e286a5d0';
  			inputdiv.style.color='#690e2c';
		}
		var op = 0.1;  // initial opacity
		inputdiv.style.display = 'block';
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
			}
			inputdiv.style.opacity = op;
			inputdiv.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
		}, 10);
		setTimeout(function(){
			var op = 1;  // initial opacity
			var timer = setInterval(function () {
			if (op <= 0.1){
					clearInterval(timer);
					inputdiv.style.display = 'none';
				}
				inputdiv.style.opacity = op;
				inputdiv.style.filter = 'alpha(opacity=' + op * 100 + ")";
				op -= op * 0.1;
			}, 50);
		},3000);
		
	}
	ValidateText(text,div){
		if (text.length>1){
			if (text.indexOf(";")>0 || text.indexOf(".")>0 || text.indexOf("&")>0){
				this.disabled=true;
				if(div.style.display==''||div.style.display=='none'){
					this.fadeDiv(div,'validation');
				}
			}
			else{
				this.disabled=false;
			}
		}
		else{
			this.disabled=true;
		}
	}
	topScreen(){
		let width=window.innerWidth;
		if (width<500){
			setTimeout(function(){
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;},442);
		}
	}
	@HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
	  let toolbar=document.getElementById('toolbar');
	  let card=document.getElementById('articleCard');
	  let cardWidth=card.getBoundingClientRect().width;
	  let sticky=toolbar.offsetTop;
	  if (window.pageYOffset > sticky) {
		toolbar.classList.add("sticky")
		toolbar.style.width=JSON.stringify(cardWidth+2)+'px';
	  } else {
		toolbar.classList.remove("sticky");
		toolbar.style.removeProperty('position');
	  }	
	}
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		let toolbar=document.getElementById('toolbar');
	  	let card=document.getElementById('articleCard');
	  	let cardWidth=card.getBoundingClientRect().width;
		toolbar.style.width=JSON.stringify(cardWidth+2)+'px';
	}
}
