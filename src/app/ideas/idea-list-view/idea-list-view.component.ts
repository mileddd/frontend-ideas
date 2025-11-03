import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../idea.service';

interface Idea {
  title: string;
  description: string;
  vote_count: number;
  id: number,
  created_at: Date
}

@Component({
  selector: 'app-idea-list-view',
  templateUrl: './idea-list-view.component.html',
  standalone : false,
  styleUrls: ['./idea-list-view.component.scss']
})
export class IdeaListViewComponent implements OnInit {
  ideas: Idea[] = [];
  constructor(private ideaService: IdeaService) { }
  showDialog = false;

  ngOnInit(): void {
    this.fetchIdeas();
  }

  fetchIdeas(): Promise<any>
  {
    return new Promise((resolve,reject) =>{
      this.ideaService.fetchIdeas().subscribe({
        next: (res) => {
          this.ideas = res;
        },
        error: (err) => {
        }
      });
    })
  }

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  addIdea(idea: any) {
    this.ideas.unshift(idea);
    this.closeDialog();
  }

  upvoteIdea(idea: Idea)
  {
    this.ideaService.upvoteIdea(idea.id).subscribe({
      next: (res) => {
        this.ideas = this.ideas.map(i =>
        i.id === idea.id ? { ...i, vote_count: res.vote_count } : i
        ).sort((a, b) => b.vote_count - a.vote_count);
      },
      error: (err) => {
      }
    });
  }

  downvoteIdea(idea: Idea)
  {
    this.ideaService.downvoteIdea(idea.id).subscribe({
      next: (res) => {
        this.ideas = this.ideas.map(i =>
        i.id === idea.id ? { ...i, vote_count: res.vote_count } : i
        ).sort((a, b) => b.vote_count - a.vote_count);
      },
      error: (err) => {
      }
    });
  }

}
