import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../idea.service';
import { ErrorService } from '../../services/error.service';

interface Idea {
  title: string;
  description: string;
  vote_count: number;
  id: number,
  created_at: Date,
  userVote: any
}

@Component({
  selector: 'app-idea-list-view',
  templateUrl: './idea-list-view.component.html',
  standalone : false,
  styleUrls: ['./idea-list-view.component.scss']
})
export class IdeaListViewComponent implements OnInit {
  ideas: Idea[] = [];
  constructor(private ideaService: IdeaService,private errorService: ErrorService) { }
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
          this.errorService.showError(err.error?.error);
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
    idea.vote_count = idea.vote_count || 0;
    idea.userVote = 0;
    this.ideas.unshift(idea);
    this.updateIdeaVoteState(idea, 0 as 1 | -1, idea.vote_count);
    this.closeDialog();
  }

  upvoteIdea(idea: Idea)
  {
    this.ideaService.upvoteIdea(idea.id).subscribe({
      next: (res) => {
        this.updateIdeaVoteState(idea, 1, res.vote_count);
      },
      error: (err) => {
        this.errorService.showError(err.error?.error);
      }
    });
  }

  downvoteIdea(idea: Idea)
  {
    this.ideaService.downvoteIdea(idea.id).subscribe({
      next: (res) => {
        this.updateIdeaVoteState(idea, -1, res.vote_count);
      },
      error: (err) => {
        this.errorService.showError(err.error?.error);
      }
    });
  }

  private updateIdeaVoteState(idea: any, type: 1 | -1 | 0, newCount: number) {
    const updated = this.ideas.find(i => i.id === idea.id);
    if (updated) {
      updated.vote_count = newCount;
      updated.userVote = (updated.userVote === type) ? 0 : type;
    }

    // Sort by votes descending
    this.ideas = [...this.ideas].sort((a, b) => b.vote_count - a.vote_count);
    console.log(this.ideas);
  }

}
