import React from "react";
import Layout from "./layout";


const index = ({ todos }) => {
  return (
    <Layout title="Todo App">
      <form style={{display: "flex", gap: 20}} action="/todos" method="post">
        <input type="text" name="title" required />
        <button>Add Todo</button>
      </form>

      <ul>
        {todos.reverse().map(({ title, completed, _id }) => (
          <li key={_id.toString()}>
            <span style={{ textDecoration: completed ? "line-through" : "" }}>
              {" "}
              {title}{" "}
            </span>{" "}
            <button data-id={_id.toString()}>Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );Layout
};

export default index;
