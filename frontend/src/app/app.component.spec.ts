import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

// Define dummy routes for testing
const routes: Routes = [
  { path: '', component: AppComponent }, // Add necessary mock routes
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Include standalone AppComponent
      ],
      providers: [provideRouter(routes)], // Use provideRouter instead of RouterTestingModule
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy(); // Ensure the component instance is created
  });

  it(`should have the 'frontend' title`, () => {
    expect(app.title).toEqual('frontend'); // Check the title value
  });

  it('should render navigation links', () => {
    fixture.detectChanges(); // Trigger DOM rendering

    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('nav ul li a');

    // Check if all links are present
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].textContent?.trim()).toBe('Home');
    expect(navLinks[1].textContent?.trim()).toBe('Top List');
    expect(navLinks[2].textContent?.trim()).toBe('favorites');
  });

  it('should have router-outlet defined', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy(); // Validate router-outlet exists
  });
});
