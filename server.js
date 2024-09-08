import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors'
const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*',
}))

// Middleware để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static('public'));

// Lấy danh sách nhân viên từ Bitrix24
app.get('/employees', async (req, res) => {
    try {
        // Gọi API lấy token
        const tokenResponse = await fetch('https://bx-oauth2.aasc.com.vn/bx/oauth2_token/local.66d973daa8a5c1.53375873');
        if (!tokenResponse.ok) {
            throw new Error(`Token API response error: ${tokenResponse.status} ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();

        const accessToken = tokenData.token;// Log access token

        if (!accessToken) {
            throw new Error('No access token received');
        }

        // Gọi API danh sách nhân viên
        const employeeResponse = await fetch('https://b24-gch904.bitrix24.vn/rest/user.get.json?auth='+accessToken);

        if (!employeeResponse.ok) {
            throw new Error(`Employee API response error: ${employeeResponse.status} ${employeeResponse.statusText}`);
        }

        const employeeData = await employeeResponse.json();
        res.json(employeeData.result); // Trả về dữ liệu cho client

    } catch (error) {
        console.error('Error fetching employees:', error); // Log lỗi
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

