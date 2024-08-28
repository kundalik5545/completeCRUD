import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import moongose from "mongoose";

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 3000;

//Schema creation
const schemaData = moongose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
  },
  { timestamps: true }
);

const userModel = moongose.model("User", schemaData);

/* To read data
URL => http://localhost:8080
*/
app.get("/", async (req, res) => {
  const data = await userModel.find({});

  res.json({ success: true, data: data });
});

/* Create data || Save data called in mongodb
URL => http://localhost:8080/create
data => 
    {
        "name":"pranav",
        "email":"pranav@gmail.com",
        "mobile":8035541516
    }
*/
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = await new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "User created successfully", data });
});

/* update data normal method
URL => http://localhost:8080/update
data => 
    {
        "id":"66cc9e47c4b2154e7f6e7f59"
    }
*/

app.put("/update", async (req, res) => {
  console.log(req.body);
  const data = await userModel.updateOne(
    { _id: req.body.id },
    { name: "rajaram" }
  );
  res.send({ success: true, message: "data updated successfully", data: data });
});

/* updates data normal method
URL => http://localhost:8080/updates
data =>     
    {
        "id":"66cca309184529cc93a6a097",
        "email":"pranavsalunkhe@mail.com"
    }
*/

app.put("/updates", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);

  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data updated successfully", data: data });
});

/* delete data 
URL => http://localhost:8080/delete/66cca2ec184529cc93a6a095
data =>     
*/
//
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});

moongose
  .connect("mongodb://localhost:27017/crudops")
  .then(() => {
    console.log("Connected to DB!!!");
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  })
  .catch((err) => console.log("Connection to DB failed!!", err));
