import { useState, useReducer } from "react";

const initialTodos = [];

const todoReducer = (state,action) => {
  switch (action.type) {
    case 'CREATE_TODO':
      let todos = [...state,{title:action.title,description:action.description,completed:false}];
      state = todos;
      return state;

    case 'TOGGLE_TODO_COMPLETE':
      let allTodos = [...state];
      allTodos[action.index].completed = action.completed;
      state = allTodos;
      return state;
  
    default:
      return state;
  }
}

function App() {
  const [allTodos,todosDispatch] = useReducer(todoReducer,initialTodos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = (e) =>{
    e.preventDefault();
    setTitle("");
    setDescription("");

    todosDispatch({type:'CREATE_TODO',title,description});
  }
  const toggleTodo = (index,completed) =>{
    todosDispatch({type:'TOGGLE_TODO_COMPLETE',index,completed:!completed});
  }
  return (
    <div className="App">
      <div>My TODO List</div>
      <hr />

      <div className="todos">
        {allTodos.map((todo,index)=>(
          <div key={index} className={todo.completed?"todo-com":"todo"} onClick={()=>{toggleTodo(index,todo.completed)}}>
            <div>
              <strong>{todo.title.toUpperCase()}</strong>
            </div>
            <div className="desc">{todo.description}</div>
          </div>
        ))}
      </div>

      <div className="form">
        <form onSubmit={addTodo}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea name="description" onChange={(e)=>{setDescription(e.target.value)}} value={description}></textarea>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
