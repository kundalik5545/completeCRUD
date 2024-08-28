import { useEffect, useState } from "react";
import axios from "axios";
// import debounce from "lodash.debounce";
import { UserForm } from "./components/UserForm";
import DisplayTable from "./components/DisplayTable";
import "./App.css";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [displayForm, setDisplayForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //Post method
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      setDisplayForm(false);
      alert(data.data.message);
      getUsersData();
    }
  };

  //Get method
  const getUsersData = async () => {
    const data = await axios.get("/");

    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  //Update method
  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditForm(true);
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put("/updates/", formDataEdit);
      if (data.data.success) {
        alert(data.data.message);
        getUsersData();
        setEditForm(false);
      }
    } catch (error) {
      console.log("🚫 Updating user failed!!!", error);
    }
  };
  //Delete method
  const deleteUserDetails = async (id) => {
    try {
      const data = await axios.delete("/delete/" + id);
      if (data.data.success) {
        alert(data.data.message);
        getUsersData();
      }
    } catch (error) {
      console.log("🚫 Deleting user failed!!!", error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  // console.log(dataList);

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setDisplayForm(true)}>
          Add
        </button>
      </div>

      {displayForm && (
        <UserForm
          handleOnChange={handleOnChange}
          onFormSubmit={onFormSubmit}
          handleCloseForm={() => setDisplayForm(false)}
          rest={formData}
        />
      )}

      {editForm && (
        <UserForm
          handleOnChange={handleEditOnChange}
          onFormSubmit={updateUserDetails}
          handleCloseForm={() => setEditForm(false)}
          rest={formDataEdit}
        />
      )}

      {/* <DisplayTable /> */}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList[0] ? (
              dataList.map((el) => {
                return (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          handleEdit(el);
                        }}
                        // onClick={() => updateUserDetails(el._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteUserDetails(el._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p style={{ textAlign: "center", fontSize: "16px" }}>No Data</p>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
