// Update your applicationid and javascript key of your parse app in the below.
Parse.initialize('myAppId', 'myMasterKey');
Parse.serverURL = "http://localhost:1337/parse"

var TodoMVC = React.createClass({
  mixins: [ParseReact.Mixin],
  getInitialState: function () {
    return {
      newTodo: ''
    }
  },
  observe: function () {
    return {
      todos: new Parse.Query('Todo').descending('createdAt')
    }
  },
  handleChange: function (e) {
    this.setState({
      newTodo: e.target.value
    })
  },
  addTodo: function (e) {
    if (e.key === 'Enter') {
      ParseReact.Mutation.Create('Todo', {
        title: this.state.newTodo
      }).dispatch();
      this.setState({
        newTodo: ''
      });
    }
  },
  deleteTodo: function (todo) {
    ParseReact.Mutation.Destroy(todo).dispatch();
  },
  renderTodos: function () {
    var todos = this.data.todos || [];
    return todos.map((todo) => {
      return (
        <li>
          <div className='view'>
            <label>{todo.title}</label>
            <button className="destroy" onClick={this.deleteTodo.bind(null, todo)} />
          </div>
        </li>
      );
    });
  },
  render: function () {
    return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.addTodo}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </header>
          <section className="main">
            <ul className="todo-list">
            {this.renderTodos()}
            </ul>
          </section>
        </div>
      );
  }
})

ReactDOM.render(<TodoMVC />, document.getElementById('app'));




































