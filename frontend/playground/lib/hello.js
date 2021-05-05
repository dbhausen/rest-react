var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/jsx-props-no-spreading */
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import NumberFormat from 'react-number-format';
var useStyles = makeStyles(function (theme) {
    return createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    });
});
function NumberFormatCustom(props) {
    var inputRef = props.inputRef, onChange = props.onChange, other = __rest(props, ["inputRef", "onChange"]);
    return (_jsx(NumberFormat, __assign({}, other, { getInputRef: inputRef, onValueChange: function (values) {
            onChange({
                target: {
                    name: props.name,
                    value: values.value,
                },
            });
        }, thousandSeparator: true, isNumericString: true, prefix: "$" }), void 0));
}
export default function FormattedInputs() {
    var classes = useStyles();
    var _a = React.useState({
        numberformat: '1320',
    }), values = _a[0], setValues = _a[1];
    var handleChange = function (event) {
        var _a;
        setValues(__assign(__assign({}, values), (_a = {}, _a[event.target.name] = event.target.value, _a)));
    };
    return (_jsx("div", __assign({ className: classes.root }, { children: _jsx(TextField, { label: "react-number-format", value: values.numberformat, onChange: handleChange, name: "numberformat", id: "formatted-numberformat-input", InputProps: {
                inputComponent: NumberFormatCustom,
            } }, void 0) }), void 0));
}
//# sourceMappingURL=hello.js.map