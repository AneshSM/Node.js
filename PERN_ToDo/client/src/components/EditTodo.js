import React, { useEffect, useState } from "react";
import "./EditTodo.css";
const EditTodo = ({ todoData }) => {
  const [description, setdata] = useState(todoData.description);
  const updateDescription = async (e) => {
    try {
      const body = { description };
      console.log(body);
      const response = await fetch(
        `http://localhost:5000/todo/${todoData.todo_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-info btn-lg"
          data-toggle="modal"
          data-target={`#id${todoData.todo_id}`}
        >
          Edit
        </button>

        <div className="modal fade" id={`id${todoData.todo_id}`} role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder={description}
                  value={description ? description : ""}
                  onChange={(e) => setdata(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default button edit"
                  data-dismiss="modal"
                  onClick={() => {
                    updateDescription();
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-default button close-btn"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTodo;
