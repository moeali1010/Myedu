import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscribePage } from './subscribe.page';
import { IonicModule } from '@ionic/angular';
describe('SubscribePage', () => {
  let component: SubscribePage;
  let fixture: ComponentFixture<SubscribePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubscribePage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscribePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      contact_name: null,
      contact_email: null,
      child_name: null,
      child_dob_day: '1',
      child_dob_month: 'January',
      child_dob_year: JSON.stringify(component.currentYear),
      child_grade: '1',
      child_gender: null,
    });
  });

  it('should add topic to topics array', () => {
    component.addToTopics('arabic');
    expect(component.topics).toContain('arabic');
  });

  it('should remove topic from topics array if already exists', () => {
    component.addToTopics('arabic');
    component.addToTopics('arabic');
    expect(component.topics).not.toContain('arabic');
  });

  it('should not add more than 3 topics', () => {
    component.addToTopics('arabic');
    component.addToTopics('islamic');
    component.addToTopics('english');
    component.addToTopics('history');
    expect(component.topics.length).toBe(3);
  });

  it('should display last 20 years', () => {
    component.displayLast20years();
    expect(component.pastYears.length).toBe(20);
    expect(component.pastYears[0]).toBe(component.currentYear - 19);
  });

  it('should display all months', () => {
    component.displayMonths();
    expect(component.months.length).toBe(12);
    expect(component.months).toContain('January');
  });

  it('should display correct number of days for February in a leap year', () => {
    component.displayDays(2020, 'February');
    expect(component.days.length).toBe(29);
  });

  it('should display correct number of days for February in a non-leap year', () => {
    component.displayDays(2019, 'February');
    expect(component.days.length).toBe(28);
  });

  it('should display correct number of days for a month with 31 days', () => {
    component.displayDays(2021, 'January');
    expect(component.days.length).toBe(31);
  });

  it('should display correct number of days for a month with 30 days', () => {
    component.displayDays(2021, 'April');
    expect(component.days.length).toBe(30);
  });

  it('should present error alert if form is invalid on submit', async () => {
    spyOn(component, 'presentErrorAlert');
    component.form.controls['contact_name'].setValue(null);
    component.submitForm();
    expect(component.presentErrorAlert).toHaveBeenCalled();
  });

  it('should present success alert if form is valid on submit', async () => {
    spyOn(component, 'presentSuccessAlert');
    component.form.controls['contact_name'].setValue('Test Name');
    component.form.controls['contact_email'].setValue('test@example.com');
    component.form.controls['child_name'].setValue('Child Name');
    component.form.controls['child_gender'].setValue('boy');
    component.submitForm();
    expect(component.presentSuccessAlert).toHaveBeenCalled();
  });
 
});
