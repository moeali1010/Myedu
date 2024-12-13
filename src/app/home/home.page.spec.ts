import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a logo image in the header', () => {
    const compiled = fixture.nativeElement;
    const logoImg = compiled.querySelector('ion-header ion-title img');
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('logo.svg');
  });



  it('should contain the top-area section', () => {
    const topArea = fixture.debugElement.query(By.css('section.top-area'));
    expect(topArea).toBeTruthy();
  });

  it('should contain the correct text in the first div', () => {
    const firstDiv = fixture.debugElement.query(By.css('#container > div:first-child')).nativeElement;
    expect(firstDiv.textContent).toContain('Discover the magic of our surprise box');
  });

  it('should contain the correct text in the second div', () => {
    const secondDiv = fixture.debugElement.query(By.css('#container > div:nth-child(2)')).nativeElement;
    expect(secondDiv.textContent).toContain("Unleash your child's curiosity with our educational subscription box filled with fun and learning.");
  });

  it('should have a button with routerLink to /subscribe', () => {
    const button = fixture.debugElement.query(By.css('button[routerLink="/subscribe"]'));
    expect(button).toBeTruthy();
  });

  it('should have an image with the correct src attribute', () => {
    const img = fixture.debugElement.query(By.css('#container img')).nativeElement;
    expect(img.src).toContain('./assets/images/home.png');
  });
});
