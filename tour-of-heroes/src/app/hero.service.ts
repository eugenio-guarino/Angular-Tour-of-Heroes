import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessagesService}  from './messages.service';

// Http symbols
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Error Handling
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private log(message: string){
    this.messagesService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService) { }

  /** GET Heroes from the server*/
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message_after_fetching the heroes
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_=> this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero>{
    // TODO: send the message_after_fetching the heroes
    this.messagesService.add( `HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remore logging infrastructure
      console.error(error); //log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: $(error.message)`);

      // Let the app keep running by returning an empty result
      return of (result as T);
    };
  }
}


