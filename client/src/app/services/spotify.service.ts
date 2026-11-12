import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  expressBaseUrl: string = 'http://127.0.0.1:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    const uri: string = this.expressBaseUrl + endpoint;
    return firstValueFrom(this.http.get(uri));
  }

  aboutMe(): Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then(data => new ProfileData(data));
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    const endpoint = '/search/' + encodeURIComponent(category) + '/' + encodeURIComponent(resource);
    return this.sendRequestToExpress(endpoint).then(data => {
      const items = data[category + 's'].items;
      if (category === 'artist') {
        return items.map((item: any) => new ArtistData(item));
      } else if (category === 'album') {
        return items.map((item: any) => new AlbumData(item));
      } else if (category === 'track') {
        return items.map((item: any) => new TrackData(item));
      }
      return [];
    });
  }

  getArtist(artistId: string): Promise<ArtistData> {
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId))
      .then(data => new ArtistData(data));
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId))
      .then(data => data.tracks.map((item: any) => new TrackData(item)));
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId))
      .then(data => data.items.map((item: any) => new AlbumData(item)));
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId))
      .then(data => new AlbumData(data));
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId))
      .then(data => data.items.map((item: any) => new TrackData(item)));
  }

  getTrack(trackId: string): Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId))
      .then(data => new TrackData(data));
  }
}
