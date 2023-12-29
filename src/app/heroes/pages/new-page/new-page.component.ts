import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{


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

  
  constructor( 
    private HeroesService: HeroesService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  
  get currentHero():Hero {
    const hero = this.heroForm.value as Hero; 

    return hero;
  }


  ngOnInit(): void {
    
    if( !this.router.url.includes('edit')) return; 

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.HeroesService.getHeroById( id ) )
      ) .subscribe ( hero => {

        if ( !hero ) return this.router.navigateByUrl('/');

        // reset -> reestablece el formulario
        // SI le mandamos un argumento, estable los campos cuyos nombres coincidan
        this.heroForm.reset( hero )
        return; 

      });

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
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnakBar(`${ hero.superhero } ha sido actualizado correctamente`);
        } )
      return;
    }

    this.HeroesService.addHero( this.currentHero )
      .subscribe( hero => {

      } )
    // this.HeroesService.updateHero( this.heroForm.value );

  }

  showSnakBar(message: string): void {
    this.snackbar.open( message, 'Done', {
      duration: 2500,
    })

  }

}
