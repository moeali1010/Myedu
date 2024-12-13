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

  //displayLast20years
  it('should populate pastYears with the last 20 years', () => {
    component.displayLast20years();

    const currentYear = new Date().getFullYear();
    const expectedYears = [];
    for (let index = 20; index > 0; index--) {
      expectedYears.push(currentYear - index + 1);
    }

    expect(component.pastYears).toEqual(expectedYears);
  });

  // displayMonths
  it('should populate months array with the twelve months', () => {
    component.displayMonths();

    const expectedMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    expect(component.months).toEqual(expectedMonths);
  });

  // leap year
  it('should return true for leap years', () => {
    const leapYears = [2000, 2004, 2008, 2012, 2016, 2020];

    leapYears.forEach((year) => {
      const result = component.leapYear(year);
      expect(result).toBeTrue();
    });
  });

  // non-leap years
  it('should return false for non-leap years', () => {
    const nonLeapYears = [1900, 1901, 2001, 2002, 2003, 2005];

    nonLeapYears.forEach((year) => {
      const result = component.leapYear(year);
      expect(result).toBeFalse();
    });
  });

  it('it shold display 31 or 30 days according to month, and display 29 or 28  February according to leap year', () => {
    component.displayDays('2024', 'January');
    expect(component.days.length).toEqual(31);
    component.displayDays('2020', 'February');
    expect(component.days.length).toEqual(29);
    component.displayDays('2021', 'February');
    expect(component.days.length).toEqual(28);
  });
});
