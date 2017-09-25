import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';

export default class DateRange extends Component {

	constructor(props){
		super(props);
		this.handleChangeTimePickerStart = this.handleChangeTimePickerStart.bind(this);
		this.handleChangeTimePickerEnd = this.handleChangeTimePickerEnd.bind(this);
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.handleDateUpdate = this.handleDateUpdate.bind(this);
	}

	handleDateUpdate(event, date){
		let{timeStart, timeEnd} = this.props;
		timeStart = sameTimeDifferentDate(timeStart, date);
		timeEnd = sameTimeDifferentDate(timeEnd, date);

		this.handleTimeUpdate({timeEnd, timeStart});

	}

	handleTimeUpdate(timeObj){
		let {timeStart, timeEnd, timestampChange} = this.props;
		let oldTimeRange = {
			timeStart,
			timeEnd
		};
		let newTimeRange = Object.assign({}, oldTimeRange, timeObj);
		timestampChange(newTimeRange.timeStart, newTimeRange.timeEnd);
	}

	handleChangeTimePickerStart(event, date){
		this.handleTimeUpdate({timeStart:date});
	}

	handleChangeTimePickerEnd(event, date){
		this.handleTimeUpdate({timeEnd:date});
	}

	render(){
		let {defaultDate} = this.props;
		return(
			<div className="row expanded">
				<div className="shrink columns">
					<DatePicker
						id="date"
						defaultDate={defaultDate}
						onChange={this.handleDateUpdate}
					/>
				</div>
				<div className="shrink columns">
					<TimePicker
						id="timeStart"
						format="24hr"
						hintText="Start TimePicker"
						value={this.props.timeStart}
						onChange={this.handleChangeTimePickerStart}
					/>
				</div>
				<div className="shrink columns">
				<TimePicker
						id="timeEnd"
						format="24hr"
						hintText="End TimePicker"
						value={this.props.timeEnd}
						onChange={this.handleChangeTimePickerEnd}
					/>
				</div>
			</div>
		)
	}
}

function sameTimeDifferentDate(time, date){

	time = moment(time);
	date = moment(date);

	time = time.set({
		'date':date.date(),
		'month':date.month(),
		'year':date.year()
	}).toDate();

	return time;
}
