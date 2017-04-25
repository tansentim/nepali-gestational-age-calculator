import React, { Component } from 'react';
import './GestationalAgeCalculator.css';
import NepaliDate from './NepaliDate';

class NepaliDateField extends Component {
	render() {
		console.log(this.props.date);
		if (this.props.date) {
			return (<span>{ NepaliDate.fromgregorian(this.props.date).toDateString() }</span>);
		} else {
			return (<span/>);
		}
	}
}


class GestationalAgeCalculator extends Component {
  constructor(props) {
	super(props);
	this.state = {
		lmpg: undefined,
	};
	this.handleChange = this.handleChange.bind(this);

  }
	handleChange(event) {
		var v = event.target.value;
		this.setState({ requested: v });

		if (/^(?:\d{4}\/){0,1}\d{1,2}\/\d{1,2}$/.test(v)) {
			var lmp = NepaliDate.fromPartialString(v);
			var lmpg = lmp.gregorian();
			this.setState({	lmpg: lmpg });
		} else {
			this.setState({ lmpg: undefined });
		}
	}
  render() {
	  let lmpg = this.state.lmpg;
	  let eddg = undefined;
	  let today = new Date();
	  let wog = undefined;
	  let extra_days = undefined;
	  if (lmpg) {
		  eddg = new Date(lmpg.getFullYear(), lmpg.getMonth(), lmpg.getDate() + 280);
		  let elapsed = Math.floor((today - lmpg) / (24 * 60 * 60 * 1000));
		  wog = Math.floor(elapsed / 7);
		  extra_days = elapsed - wog * 7;
	  }

    return (
			<div className="GestationalAgeCalculator">
				<div>
					<table className="mine">
						<thead>
							<tr className="mine">
								<td className="mine centre" colSpan="4">Gestational Age Calculator with BS dates</td>
							</tr>
						</thead>
						<tbody>
							<tr className="mine">
								<td className="mine">Last Menstrual Period</td>
								<td className="mine">
									<input id="mylmp_id" value={this.state.requested} type="text" onChange={this.handleChange} />
								</td>
								<td className="mine note" colSpan="2">Enter the date of the LMP in the form month/day e.g. 6/19, 9/3.</td>
							</tr>
							<tr className="mine">
								<td className="mine">Last Menstrual Period</td>
								<td className="mine"><NepaliDateField date={lmpg} /></td>
								<td className="mine">Today&rsquo;s Date</td>
								<td className="mine"><NepaliDateField date={today} /></td>
							</tr>
							<tr className="mine">
								<td className="mine">Expected Date of Delivery</td>
								<td className="mine"><NepaliDateField date={eddg} /></td>
								<td className="mine">Gestation</td>
								<td className="mine">{wog ? ((wog + " week") + (wog > 1 ? "s" : "")) : ""} {extra_days ? (extra_days + " day" + (extra_days > 1 ? "s" : "")) : ""}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
    );
  }
}

export default GestationalAgeCalculator;
