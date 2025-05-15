import { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const AddNewOrder = () => {
  const [formData, setFormData] = useState({
    dyeingOrder: "",
    sectionName: "",
    PI_No: "",
    yarn_type: "",
    unit_price: "",
    marketing_name: "",
    merchandiser_name: "",
    factory_name: "",
  });
  const [yarnType, setYarnType] = useState({
    yarn_type: "",
    added_by: "Riad Sarkar",

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setYarnType({ ...yarnType, [e.target.name]: e.target.value });
  };
  console.log(yarnType, 'line 26');
  const insertNewOrder = () => {
    const data = [formData];

    axios.post("http://localhost/southDragon/phpServer/pages/insert.php", {
      data: data,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    console.log("submitted:", formData);
  };

  return (
    <div className="mt-5 w-[95%] m-auto">
      <div className="bg-white p-4 border-1 rounded-lg shadow-sm">
        <TextField
          fullWidth
          name="dyeingOrder"
          label="Dyeing Order"
          variant="outlined"
          value={formData.dyeingOrder}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <TextField
            fullWidth
            name="sectionName"
            label="Section Name"
            variant="outlined"
            value={formData.sectionName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="PI_No"
            label="PI NO"
            variant="outlined"
            value={formData.PI_No}
            onChange={handleChange}
          />
        </div>
        <TextField
          fullWidth
          name="yarn_type"
          label="Yarn Type"
          variant="outlined"
          value={formData.yarn_type}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <TextField
            fullWidth
            name="unit_price"
            label="Unit Price"
            variant="outlined"
            value={formData.unit_price}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <TextField
            fullWidth
            name="marketing_name"
            label="Marketing Name"
            variant="outlined"
            value={formData.marketing_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="merchandiser_name"
            label="Merchandiser Name"
            variant="outlined"
            value={formData.merchandiser_name}
            onChange={handleChange}
          />
        </div>
        <TextField
          fullWidth
          name="factory_name"
          label="Factory Name"
          variant="outlined"
          value={formData.factory_name}
          onChange={handleChange}
        />
        <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
          <Button onClick={insertNewOrder} fullWidth color="success" variant="contained">
            Submit
          </Button>
          <Button fullWidth color="error" variant="contained" disableElevation>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewOrder;
