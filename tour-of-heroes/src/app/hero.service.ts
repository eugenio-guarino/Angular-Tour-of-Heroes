import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of} from 'rxjs';
import { MessagesService}  from './messages.service';

// Http symbols
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private log(message: string){
    this.messagesService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'apiheroes'; // URL to web api

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService) { }

  /** GET Heroes from the server*/
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message_after_fetching the heroes
    this.http.get<Hero[]>(this.heroesUrl)
    return of (HEROES);
  }

  getHero(id: number): Observable<Hero>{
    // TODO: send the message_after_fetching the heroes
    this.messagesService.add( `HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }
}


