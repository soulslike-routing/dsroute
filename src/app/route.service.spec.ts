import { TestBed } from '@angular/core/testing';
import map from '../assets/map.json'
import { RouteService } from './route.service';

describe('RouteService', () => {
  let service: RouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RouteService] });
    service = TestBed.inject(RouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load the map from json file', () => {
    expect(service.getMap()).toEqual(map["locations"]);
  });

  it('should start with empty route', () => {
    expect(service.getRoute().length).toBe(0);
  });

  it('should start at location Northern Undead Asylum', () => {
    expect(service.getCurrentLocation()).toBe(map["locations"][0]);
    expect(service.getCurrentLocation().name).toEqual("Northern Undead Asylum");
  });

  it('should return the correct location at index', () => {
    expect(service.getLocationAtIndex(4)).toBe(map["locations"][4]);
    expect(service.getLocationAtIndex(10)).toBe(map["locations"][10]);
    expect(service.getLocationAtIndex(12)).toBe(map["locations"][12]);
  });

  // TODO Mock some kind of map and test routing functions
});
