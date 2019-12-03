

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            students: []
        };
        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://localhost:3000/students').then(function (res) {
                return res.json();
            }).then(function (data) {
                return _this2.setState({
                    students: data.students
                });
            }).catch(function (err) {
                err, "Something went wrong.";
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var studentList = this.state.students.map(function (student) {
                return React.createElement(
                    'li',
                    { key: student.id },
                    React.createElement(
                        'div',
                        null,
                        'Name: ',
                        student.student
                    ),
                    React.createElement(
                        'div',
                        null,
                        'Grade: ',
                        student.current_grade
                    )
                );
            });

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'Student Roster'
                ),
                React.createElement(
                    'ol',
                    null,
                    studentList
                )
            );
        }
    }]);

    return App;
}(React.Component);

var domContainer = document.querySelector('#display_app');
ReactDOM.render(React.createElement(App, null), domContainer);