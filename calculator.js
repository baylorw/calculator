"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Calculator = /** @class */ (function (_super) {
    __extends(Calculator, _super);
    function Calculator(props) {
        var _this = _super.call(this, props) || this;
        _this.getActualP = function () {
            return (_this.state.tP + _this.state.fN);
        };
        _this.getActualN = function () {
            return (_this.state.fP + _this.state.tN);
        };
        _this.getReportedP = function () {
            return (_this.state.tP + _this.state.fP);
        };
        _this.getReportedN = function () {
            return (_this.state.fN + _this.state.tN);
        };
        _this.getTotal = function () {
            return (_this.getActualP() + _this.getActualN());
        };
        /**
         * The F-score is the harmonic mean (sort of the average) of precision and recall.
         * A weighted F-score increases (beta=2) or decreases (beta=0.5) the relative weight of precision.
         * If it's more important that your positives are actually positive), use F2.
         * If it's more important that you find all the positives, use F0.5.
         *
         * @param {} recallWeight
         */
        _this.getFScore = function (recallWeight) {
            var squaredRecall = recallWeight ^ 2;
            var numerator = (1 + squaredRecall) * _this.state.tP;
            var denominator = numerator + (_this.state.fN * squaredRecall) + _this.state.fP;
            var f = numerator / denominator;
            return f;
        };
        _this.onTPChange = function (e) {
            var input = e.target.value.replace(/\D/, '');
            var number = parseInt(input);
            _this.setState({ tP: number });
        };
        _this.onTNChange = function (e) {
            var input = e.target.value.replace(/\D/, '');
            var number = parseInt(input);
            _this.setState({ tN: number });
        };
        _this.onFPChange = function (e) {
            var input = e.target.value.replace(/\D/, '');
            var number = parseInt(input);
            _this.setState({ fP: number });
        };
        _this.onFNChange = function (e) {
            var input = e.target.value.replace(/\D/, '');
            var number = parseInt(input);
            _this.setState({ fN: number });
        };
        _this.state =
            {
                tP: 0,
                tN: 0,
                fP: 0,
                fN: 0,
            };
        return _this;
    }
    Calculator.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Confusion Matrix"),
            React.createElement("table", { border: "1" },
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: "2" }),
                    React.createElement("td", { colSpan: "2", align: "center" }, "Reality"),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: "2" }),
                    React.createElement("td", null,
                        React.createElement("b", null, "Positive")),
                    React.createElement("td", null,
                        React.createElement("b", null, "Negative")),
                    React.createElement("td", null, "\u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { rowspan: "2" }, "Reported"),
                    React.createElement("td", null,
                        React.createElement("b", null, "Positive")),
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", value: this.state.tP, size: "5", onChange: this.onTPChange, style: { backgroundColor: 'lightgreen', textAlign: "right" } })),
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", value: this.state.fP, size: "5", onChange: this.onFPChange, style: { backgroundColor: 'salmon', textAlign: "right" } })),
                    React.createElement("td", { align: "right" }, this.getReportedP())),
                React.createElement("tr", null,
                    React.createElement("td", null,
                        React.createElement("b", null, "Negative")),
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", value: this.state.fN, size: "5", onChange: this.onFNChange, style: { backgroundColor: 'salmon', textAlign: "right" } })),
                    React.createElement("td", null,
                        React.createElement("input", { type: "text", value: this.state.tN, size: "5", onChange: this.onTNChange, style: { backgroundColor: 'lightgreen', textAlign: "right" } })),
                    React.createElement("td", { align: "right" }, this.getReportedN())),
                React.createElement("tr", null,
                    React.createElement("td", { colSpan: "2" }),
                    React.createElement("td", { align: "right" }, this.getActualP()),
                    React.createElement("td", { align: "right" }, this.getActualN()),
                    React.createElement("td", { align: "right" }, this.getTotal()))),
            React.createElement("hr", null),
            React.createElement("table", null,
                React.createElement("tr", null,
                    React.createElement("td", null, "Accuracy:"),
                    React.createElement("td", null,
                        100 * ((this.state.tP + this.state.tN) / this.getTotal()).toFixed(2),
                        "%"),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0"),
                    React.createElement("td", null, "Sensitivity:"),
                    React.createElement("td", null, (this.state.tP / this.getActualP()).toFixed(2)),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0"),
                    React.createElement("td", null, "Recall:"),
                    React.createElement("td", null, (this.state.tP / this.getActualP()).toFixed(2)),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0"),
                    React.createElement("td", null, "F:"),
                    React.createElement("td", null, this.getFScore(1).toFixed(2)),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0"),
                    React.createElement("td", null, "PPV:"),
                    React.createElement("td", null, (this.state.tP / this.getReportedP()).toFixed(2)),
                    React.createElement("td", null, "\u00A0 \u00A0 \u00A0 \u00A0"),
                    React.createElement("td", null, "FDR:"),
                    React.createElement("td", null, (this.state.fP / this.getReportedP()).toFixed(2))),
                React.createElement("tr", null,
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null, "\u00A0"),
                    React.createElement("td", null, "Specificity:"),
                    React.createElement("td", null, (this.state.tN / this.getActualN()).toFixed(2)),
                    React.createElement("td", null, "\u00A0"),
                    React.createElement("td", null, "Precision:"),
                    React.createElement("td", null, (this.state.tP / this.getReportedP()).toFixed(2)),
                    React.createElement("td", null, "\u00A0"),
                    React.createElement("td", null, "F 1/2:"),
                    React.createElement("td", null, this.getFScore(0.5).toFixed(2)),
                    React.createElement("td", null, "\u00A0"),
                    React.createElement("td", null, "NPV:"),
                    React.createElement("td", null, (this.state.tN / this.getReportedN()).toFixed(2)),
                    React.createElement("td", null, "\u00A0"),
                    React.createElement("td", null, "FOR:"),
                    React.createElement("td", null, (this.state.fN / this.getReportedN()).toFixed(2))),
                React.createElement("tr", null,
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null, "F 2:"),
                    React.createElement("td", null, this.getFScore(2).toFixed(2)),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null),
                    React.createElement("td", null)))));
    };
    return Calculator;
}(React.Component));
ReactDOM.render(React.createElement(Calculator, null), document.getElementById('root'));
//# sourceMappingURL=calculator.js.map