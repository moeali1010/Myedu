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
      imports: [IonicModule.forRoot()],
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
    const firstDiv = fixture.debugElement.query(
      By.css('#container > div:first-child')
    ).nativeElement;
    expect(firstDiv.textContent).toContain(
      'Discover the magic of our surprise box'
    );
  });

  it('should contain the correct text in the second div', () => {
    const secondDiv = fixture.debugElement.query(
      By.css('#container > div:nth-child(2)')
    ).nativeElement;
    expect(secondDiv.textContent).toContain(
      "Unleash your child's curiosity with our educational subscription box filled with fun and learning."
    );
  });

  it('should have a button with routerLink to /subscribe', () => {
    const button = fixture.debugElement.query(
      By.css('button[routerLink="/subscribe"]')
    );
    expect(button).toBeTruthy();
  });


  it('should have an image with the correct src attribute', () => {
    const image = fixture.debugElement.query(By.css('img'));
    const expectedSrc = './assets/images/home.png';
    expect(image.nativeElement.src).toContain(expectedSrc);
  });

  it('should have a section with class "bottom-area"', () => {
    const bottomArea = fixture.debugElement.query(
      By.css('section.bottom-area')
    );
    expect(bottomArea).toBeTruthy();
  });

  it('should have a div with id "container" inside the bottom-area section', () => {
    const container = fixture.debugElement.query(
      By.css('section.bottom-area #container')
    );
    expect(container).toBeTruthy();
  });

  it('should have a div with text "Discover"', () => {
    const discoverDiv = fixture.debugElement.query(
      By.css('section.bottom-area #container > div:nth-child(1)')
    );
    expect(discoverDiv.nativeElement.textContent).toContain('Discover');
  });

  it('should have a div with text "How It Works: Subscribe and Receive Your Surprise Box"', () => {
    const howItWorksDiv = fixture.debugElement.query(
      By.css('section.bottom-area #container > div:nth-child(2)')
    );
    expect(howItWorksDiv.nativeElement.textContent).toContain(
      'How It Works: Subscribe and Receive Your Surprise Box'
    );
  });

  it('should have a div with subscription description text', () => {
    const descriptionDiv = fixture.debugElement.query(
      By.css('section.bottom-area #container > div:nth-child(3)')
    );
    const expectedText = `Subscribe to our surprise subscription box and give your child the gift
        of learning. Each month, we curate a box filled with educational
        materials tailored to your child's age and interests.`;
    expect(descriptionDiv.nativeElement.textContent.trim()).toBe(
      expectedText.trim()
    );
  });

  it('should render ion-grid with steps', () => {
    const compiled = fixture.nativeElement;
    const grid = compiled.querySelector('ion-grid.steps');
    expect(grid).toBeTruthy();
  });

  it('should render three steps', () => {
    const compiled = fixture.nativeElement;
    const steps = compiled.querySelectorAll('ion-col');
    expect(steps.length).toBe(5);
  });

  it('should render step 1 correctly', () => {
    const compiled = fixture.nativeElement;
    const step1 = compiled.querySelectorAll('ion-col')[0];
    expect(step1.querySelector('.title').textContent).toContain(
      'Step 1: Subscribe'
    );
    expect(step1.querySelector('.content').textContent).toContain(
      "Select a subscription plan that suits your child's learning needs and preferences."
    );
  });

  it('should render step 2 correctly', () => {
    const compiled = fixture.nativeElement;
    const step2 = compiled.querySelectorAll('ion-col')[1];
    expect(step2.querySelector('.title').textContent).toContain(
      'Step 2: Personalise Your Box'
    );
    expect(step2.querySelector('.content').textContent).toContain(
      "Tell us about your child's age, interests, and learning goals, and we'll customize their surprise box accordingly."
    );
  });

  it('should render step 3 correctly', () => {
    const compiled = fixture.nativeElement;
    const step3 = compiled.querySelectorAll('ion-col')[2];
    expect(step3.querySelector('.title').textContent).toContain(
      'Step 3: Receive Your Surprise Box'
    );
    expect(step3.querySelector('.content').textContent).toContain(
      'Sit back and relax as your child eagerly awaits the arrival of their monthly surprise box filled with engaging learning materials.'
    );
  });

  it('should have a button with text "Subscribe Now" and routerLink to /subscribe', () => {
    const buttons = fixture.debugElement.queryAll(
      By.css('button[routerLink="/subscribe"]')
    );
    expect(buttons.length).toBe(2);

    buttons.forEach((button) => {
      const nativeButton = button.nativeElement;
      expect(nativeButton).toBeTruthy();
      expect(nativeButton.textContent).toContain('Subscribe Now');
    });
  });

  it('should create and present a success alert', async () => {
    const alertSpy = spyOn(
      component['alertController'],
      'create'
    ).and.callThrough();
    await component.presentSuccessAlert();
    expect(alertSpy).toHaveBeenCalledWith({
      header: 'Success',
      subHeader: 'Thanks you , your email has been saved',
      buttons: ['OK'],
    });
  });

  it('should reset the form after presenting success alert', async () => {
    spyOn(component['alertController'], 'create').and.returnValue(
      Promise.resolve({
        present: () => Promise.resolve(),
      } as any)
    );
    const formResetSpy = spyOn(component.form, 'reset');
    await component.presentSuccessAlert();
    expect(formResetSpy).toHaveBeenCalled();
  });

  it('should initialize the form with subscribeEemail control', () => {
    component.initializeForm();
    expect(component.form.contains('subscribeEemail')).toBeTruthy();
  });

  it('should make subscribeEemail control required', () => {
    component.initializeForm();
    const control = component.form.get('subscribeEemail');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should validate subscribeEemail control as email', () => {
    component.initializeForm();
    const control = component.form.get('subscribeEemail');
    control.setValue('invalidEmail');
    expect(control.valid).toBeFalsy();
    control.setValue('valid@example.com');
    expect(control.valid).toBeTruthy();
  });
});
