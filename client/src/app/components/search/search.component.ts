import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService],
  standalone: false
})
export class SearchComponent implements OnInit {
  searchString: string = '';
  searchCategory: string = 'artist';
  searchCategories: string[] = ['artist', 'album', 'track'];
  resources: ResourceData[] = [];
  tracks: TrackData[] = [];
  displayCategory: string = '';

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() { }

  search(): void {
    if (!this.searchString.trim()) {
      return;
    }
    const category = this.searchCategory;
    this.spotifyService.searchFor(category, this.searchString.trim()).then(results => {
      this.resources = results;
      this.tracks = category === 'track' ? results as TrackData[] : [];
      this.displayCategory = category;
    });
  }
}
