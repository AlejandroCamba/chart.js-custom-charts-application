export class CapacityOffload {
	private cdnTuples: Array<Array<number>>;
	private p2pTuples: Array<Array<number>>;

	private cdnTimestamp: Array<number> = [];
	private cdnData: Array<number> = [];

	private p2pTimestamp: Array<number> = [];
	private p2pData: Array<number> = [];

	private min: number;
	private max: number; 
	private average: number;

	constructor(cdnTuples: Array<Array<number>>, p2pTuples: Array<Array<number>>){
		this.cdnTuples = cdnTuples;
		this.p2pTuples = p2pTuples;

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
		this.setGraph(this.cdnTuples, this.cdnTimestamp, this.cdnData);
		this.setGraph(this.p2pTuples, this.p2pTimestamp, this.p2pData);
	}

	public getP2pLabels(): Array<number> {
		return this.p2pTimestamp;
	}

	public getP2pData(): Array<number> {
		return this.p2pData;
	}

	public getCdnLabels(): Array<number> {
		return this.cdnTimestamp;
	}

	public getCdnData(): Array<number> {
		return this.cdnData;
	}

	public getMin(): number {
		return this.min;
	}

	public getMax(): number {
		return this.max;
	}

	public getAverage(): number {
		return this.average;
	}

	public setMin(min: number) {
		this.min = min;
	}

	public setMax(max: number) {
		this.max = max;
	}

	public setAverage(average: number) {
		this.average = average;
	}

}