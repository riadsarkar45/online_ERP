import { Box, TextField,Button, Typography } from "@mui/material";
const Login = () => {
    return (
        <div className="w-[30rem] m-auto mt-20 bg-white h-[20rem] p-4 border-1">
            <h2 className="mb-[2rem] text-3xl font-bold underline text-red-500">Login</h2>
            <div className="mb-4">

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth

                    />
                
            </div>
            <div className="mb-4">

                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth

                    />
                
            </div>
            <div>

            <Button fullWidth variant="contained">Contained</Button>
                
            </div>
        </div>
    );
};

export default Login;