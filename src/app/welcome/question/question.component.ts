import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, interval } from 'rxjs';
import { QuestionService } from '../../service/question.service';


@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
	@Input() names!: string;
	public name: string = ""
	public questionlist: any = [];
	public currentquestion: number = 0;
	public marks: number = 0
	counter = 60;
	correctanswer: number = 0;
	incorrectanswer: number = 0;
	interval$: any;
	Progress: string = "0";
	constructor(private questionservice: QuestionService, private route: ActivatedRoute) {
		this.route.queryParams.subscribe((data:any) => {
			this.name = data.name;
		})
	} 

	ngOnInit(): void {
		this.getallquestion();
		this.startcounter();
		
	}
	getallquestion() {
		this.questionservice.getquestionjson().subscribe(res => {
			this.questionlist = res.questions;
		})
	}
	nextquestion() {
		this.currentquestion++;
	}
	previousquestion() {
		this.currentquestion--;
	}


	answer(currentquestion: number, option: any) {
		if (option.correct) {
			this.marks += 1;
			this.correctanswer++;
			this.currentquestion++;
			this.resetcounter()
			this.getProgressPercent();

			// this.marks = this.marks +1;
		}
		else {
			this.marks -= 1;
			this.currentquestion++;
			this.resetcounter()
			this.incorrectanswer++;
			this.getProgressPercent();
		}
	}
	startcounter() {
		this.interval$ = interval(1000)
			.subscribe(val => {
				this.counter--;
				if (this.counter === 0) {
					this.currentquestion++;
					this.counter = 60;
					this.marks -= 1;
				}
			});
		setTimeout(() => {
			this.interval$.unsubscribe()
		}, 600000)
	}
	stopcounter() {
		this.interval$.unsubscribe();
		this.counter = 0;
	}
	resetcounter() {
		this.stopcounter();
		this.counter = 60;
		this.startcounter();



	}
	resetquiz() {

		this.resetcounter();
		this.getallquestion();
		this.marks = 0;
		this.counter = 60;
		this.currentquestion = 0;
		this.Progress = "0";
	}
	getProgressPercent() {
		this.Progress = ((this.currentquestion / this.questionlist.length) * 100).toString();
		return this.Progress
	}


}
