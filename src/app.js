


'use strict';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            students: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/students')
            .then(res => res.json())
            .then(data => 
                this.setState({
                    students: data.students
                })
                )
            .catch( err => {err, "Something went wrong."})
    }

    render() {
        const studentList = this.state.students.map((student) => {
            return ( 
                <li key={student.id}>
                    <div>Name: {student.student}</div>
                    <div>Grade: {student.current_grade}</div>
                </li>
            );
        });

        return (
            <div>
                <h1>Student Roster</h1>
                <ol>
                    {studentList}
                </ol>
            </div>
        )
    }
}

const domContainer = document.querySelector('#display_app');
ReactDOM.render(<App />, domContainer);