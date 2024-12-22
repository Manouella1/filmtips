import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { By } from '@angular/platform-browser';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent], // Include standalone component in imports
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;

    // Set up the movie input with strict typing
    component.movie = {
      title: 'Inception',
      poster: 'https://via.placeholder.com/150',
      description: 'A mind-bending thriller',
    };

    fixture.detectChanges(); // Trigger change detection to render the component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy(); // Verify the component instance is created
  });

  it('should display the movie title', () => {
    const titleElement: HTMLElement | null = fixture.debugElement.query(By.css('.detail-title'))?.nativeElement ?? null;
    expect(titleElement?.textContent?.trim()).toBe('Inception'); // Check if title matches
  });

  it('should display the movie poster', () => {
    const posterElement: HTMLImageElement | null = fixture.debugElement.query(By.css('.movie-poster'))?.nativeElement ?? null;
    expect(posterElement?.src).toContain('https://via.placeholder.com/150'); // Validate poster URL
  });

  it('should display the movie description', () => {
    const descriptionElement: HTMLElement | null = fixture.debugElement.query(By.css('.detail-description'))?.nativeElement ?? null;
    expect(descriptionElement?.textContent?.trim()).toBe('A mind-bending thriller'); // Verify description
  });

  it('should render the movie only when movie input is provided', () => {
    // Reset the movie input to null and detect changes
    component.movie = null;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('.detail-title'));
    const posterElement = fixture.debugElement.query(By.css('.movie-poster'));
    const descriptionElement = fixture.debugElement.query(By.css('.detail-description'));

    // Ensure no elements are rendered
    expect(titleElement).toBeNull();
    expect(posterElement).toBeNull();
    expect(descriptionElement).toBeNull();
  });
});
