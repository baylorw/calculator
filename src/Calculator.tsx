import React from 'react';
import ReactDOM from 'react-dom';

class Calculator extends React.Component {
	state = {
        tP: 0,
        tN: 0,
        fP: 0,
        fN: 0,
    }

    getActualP = () => {
        return (this.state.tP + this.state.fN)
    }
    getActualN = () => {
        return (this.state.fP + this.state.tN)
    }
    getReportedP = () => {
        return (this.state.tP + this.state.fP)
    }
    getReportedN = () => {
        return (this.state.fN + this.state.tN)
    }
    getTotal = () => {
        return (this.getActualP() + this.getActualN())
    }
    /**
     * The F-score is the harmonic mean (sort of the average) of precision and recall.
     * A weighted F-score increases (beta=2) or decreases (beta=0.5) the relative weight of precision.
     * If it's more important that your positives are actually positive), use F2.
     * If it's more important that you find all the positives, use F0.5.
     * 
     * @param {} recallWeight 
     */
    getFScore = (recallWeight: number) => {
        const squaredRecall = recallWeight^2
        const numerator = (1 + squaredRecall) * this.state.tP
        const denominator = numerator + (this.state.fN * squaredRecall) + this.state.fP
        const f = numerator / denominator
        return f
    }

    onTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/,'')
        const number = parseInt(input)
        this.setState({tP: number})
    }
    onTNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/,'')
        const number = parseInt(input)
		this.setState({tN: number})
    }
    onFPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/,'')
        const number = parseInt(input)
		this.setState({fP: number})
    }
    onFNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/,'')
        const number = parseInt(input)
		this.setState({fN: number})
    }
    
    render() {
        return (
            <div>
              <h1>Confusion Matrix</h1>
              <table style={{borderWidth: 1}}>
                <tr>
                    <td colSpan={2}></td><td colSpan={2} align="center">Reality</td><td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
                </tr>
                <tr>
                    <td colSpan={2}></td><td><b>Positive</b></td><td><b>Negative</b></td><td>&nbsp;</td>
                </tr>
                <tr>
                    <td rowSpan={2}>Reported</td>
                    <td><b>Positive</b></td>
                    <td><input type="text" value={this.state.tP} size={5} onChange={this.onTPChange} style={{backgroundColor:'lightgreen', textAlign:"right"}}/></td>
                    <td><input type="text" value={this.state.fP} size={5} onChange={this.onFPChange} style={{backgroundColor:'salmon', textAlign:"right"}}/></td>
                    <td align="right">{this.getReportedP()}</td>
                </tr>
                <tr>
                    
                    <td><b>Negative</b></td>
                    <td><input type="text" value={this.state.fN} size={5} onChange={this.onFNChange} style={{backgroundColor:'salmon', textAlign:"right"}}/></td>
                    <td><input type="text" value={this.state.tN} size={5} onChange={this.onTNChange} style={{backgroundColor:'lightgreen', textAlign:"right"}}/></td>
                    <td align="right">{this.getReportedN()}</td>
                </tr>
                <tr> 
                    <td colSpan={2}></td>
                    <td align="right">{this.getActualP()}</td>
                    <td align="right">{this.getActualN()}</td>
                    <td align="right">{this.getTotal()}</td>
                </tr>
              </table>

              <hr></hr>

              <table>
                <tr>
                    <td>Accuracy:</td><td>{(100*(this.state.tP + this.state.tN) / this.getTotal()).toFixed(2)}%</td>
                    <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td>Sensitivity:</td><td>{(this.state.tP / this.getActualP()).toFixed(2)}</td>
                    <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td>Recall:</td><td>{(this.state.tP / this.getActualP()).toFixed(2)}</td>
                    <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td>F:</td><td>{this.getFScore(1).toFixed(2)}</td>
                    <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td>PPV:</td><td>{(this.state.tP / this.getReportedP()).toFixed(2)}</td>
                    <td>&nbsp; &nbsp; &nbsp; &nbsp;</td>
                    <td>FDR:</td><td>{(this.state.fP / this.getReportedP()).toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td><td></td>
                    <td>&nbsp;</td>
                    <td>Specificity:</td><td>{(this.state.tN / this.getActualN()).toFixed(2)}</td>
                    <td>&nbsp;</td>
                    <td>Precision:</td><td>{(this.state.tP / this.getReportedP()).toFixed(2)}</td>
                    <td>&nbsp;</td>
                    <td>F 1/2:</td><td>{this.getFScore(0.5).toFixed(2)}</td>
                    <td>&nbsp;</td>
                    <td>NPV:</td><td>{(this.state.tN / this.getReportedN()).toFixed(2)}</td>
                    <td>&nbsp;</td>
                    <td>FOR:</td><td>{(this.state.fN / this.getReportedN()).toFixed(2)}</td>
                </tr>
                <tr>
                    <td></td><td></td>
                    <td></td>
                    <td></td><td></td>
                    <td></td>
                    <td></td><td></td>
                    <td></td>
                    <td>F 2:</td><td>{this.getFScore(2).toFixed(2)}</td>
                    <td></td>
                    <td></td><td></td>
                    <td></td>
                    <td></td><td></td>
                </tr>
              </table>
            </div>
          );        
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
