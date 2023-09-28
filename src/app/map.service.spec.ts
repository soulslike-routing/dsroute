import { TestBed } from '@angular/core/testing';
import { MapService } from './map.service';


describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loads the map from json file', () => {
    expect(service.getMap()).toEqual(service.map);
  });

  it('returns the correct location at index', () => {
    expect(service.getLocationAtIndex(4)).toBe(service.map[4]);
    expect(service.getLocationAtIndex(10)).toBe(service.map[10]);
    expect(service.getLocationAtIndex(12)).toBe(service.map[12]);
  });
});
