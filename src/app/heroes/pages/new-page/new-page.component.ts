import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {


  // Formulario reactivo

  // Cada elemento de nuestro formulario tiene que estár contenido dentro de un elemento html padre

  // El valor entre () es el valor inicial. 
  heroForm = new FormGroup({
    id:         new FormControl<string>(''),
    superhero:  new FormControl<string>('', { nonNullable: true } ),
    publisher:  new FormControl<Publisher>( Publisher.DCComics ),
    first_appearance: new FormControl<string>(''),
    alter_ego:  new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img:    new FormControl(''),
  });

  public publishers = [
    {id: 'DC Comics', desc:'CD - Comics'}, 
    {id: 'Marvel Comics', desc:'Marvel - Comics'}
  ];

  constructor( private HeroesService: HeroesService ) {}

  get currentHero():Hero {
    const hero = this.heroForm.value as Hero; 

    return hero;
  }

  onSubmit():void {
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    // })
    
    if ( this.heroForm.invalid ) return; 

    if ( this.currentHero.id ){

      // Al ser un observable me tengo que suscribir, sino NO se dispara
      this.HeroesService.updateHero( this.currentHero )
        .subscribe( hero => {

        } )
      return;
    }

    this.HeroesService.addHero( this.currentHero )
      .subscribe( hero => {

      } )
    // this.HeroesService.updateHero( this.heroForm.value );

  }

}
