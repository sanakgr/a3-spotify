import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  name: string = '???';
  profile_pic: string = 'assets/unknown.jpg';
  profile_link: string = '';

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() { }

  loadInfo(): void {
    this.spotifyService.aboutMe().then(profile => {
      this.name = profile.name;
      this.profile_pic = profile.imageURL;
      this.profile_link = profile.spotifyProfile;
    });
  }
}
