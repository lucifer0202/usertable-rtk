import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getData = () => {
  const config = {
    headers: {
      "X-Master-Key":
        "$2b$10$E8jAP5H9iAXovvcFyyrpiuxRv7NBHEN.TJ9gWaW.nRis2QgW8gYa.",
    },
  };
  axios
    .get("https://api.jsonbin.io/v3/b/64b257f29d312622a37fc491", config)
    .then((res) => {
      return res.data.record;
    })
    .catch((err) => console.log(err));
};

const initialState = {
  tasks: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        phonenumber: action.payload.phonenumber,
      });
    },
    deleteUser: (state, action) => {
      console.log("state", action.payload);
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    usersLoading(state, action) {
        // Use a "state machine" approach for loading state instead of booleans
        if(state.loading === 'idle') {
            state.loading = 'pending'
        }
    },
    usersReceived(state, action) {
        if(state.loading === 'pending') {
            state.loading = 'idle'
            state.users = action.payload
        }
    }
  },
});
const {usersLoading, usersReceived} = userSlice.actions;

const fetchUsers = () => async dispatch => {
    dispatch(usersLoading());
    const config = {
    headers: {
      "X-Master-Key":
        "$2b$10$E8jAP5H9iAXovvcFyyrpiuxRv7NBHEN.TJ9gWaW.nRis2QgW8gYa.",
    },
  };
  axios
    .get("https://api.jsonbin.io/v3/b/64b257f29d312622a37fc491", config)
    .then((res) => {
    //   return res.data.record;
      dispatch(usersReceived(res.data.record));
    })
    .catch((err) => console.log(err));
    // const response = await usersAPI.fetchAll()

}
fetchUsers();
export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
