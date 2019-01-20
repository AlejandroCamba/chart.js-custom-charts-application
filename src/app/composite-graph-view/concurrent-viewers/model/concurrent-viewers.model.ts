export class ConcurrentViewers {
	private viewersTuples: Array<Array<number>>;

	private viewersTimestamp: Array<number> = [];
	private viewers: Array<number> = [];

	constructor(viewersTuples: Array<Array<number>>){
		this.viewersTuples = viewersTuples;

		this.mapDataIntoDisplayable();
	}
	
	private setGraph(tuples: Array<Array<number>>, timestamp: Array<number>, value: Array<number>){
		tuples.reduce((curr, next) => {
            return (curr.concat(next));
        }).map((response) => {
            timestamp.length > value.length ? value.push(response) : timestamp.push(response);
        });
	}

	private mapDataIntoDisplayable(): void {
		this.setGraph(this.viewersTuples, this.viewersTimestamp, this.viewers);
	}

	public getViewersLabels(){
		return this.viewersTimestamp;
	}

	public getViewers() {
		return this.viewers;
	}
}