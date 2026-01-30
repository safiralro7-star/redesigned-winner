const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'downloads/' });

app.use(express.static('./')); // Serves your HTML/JS files
app.use(express.json());

// Handle File Uploads
app.post('/upload', upload.single('appFile'), (req, res) => {
    const { name, version, description } = req.body;
    const oldPath = req.file.path;
    const newPath = path.join('downloads', req.file.originalname);

    // 1. Move file to downloads folder with its original name
    fs.renameSync(oldPath, newPath);

    // 2. Update apps.json database
    const apps = JSON.parse(fs.readFileSync('apps.json'));
    const newApp = {
        id: name.toLowerCase().replace(/\s/g, '_'),
        name: name,
        version: version,
        description: description,
        icon: "assets/default.png",
        file: `downloads/${req.file.originalname}`,
        history: `v${version}: Initial Community Upload.`
    };
    
    apps.push(newApp);
    fs.writeFileSync('apps.json', JSON.stringify(apps, null, 2));

    res.send("Protocol Uploaded Successfully!");
});
// Handle App Reports
app.post('/report', (req, res) => {
    const { id } = req.body;
    const reportLog = `[${new Date().toISOString()}] REPORTED_APP: ${id}\n`;
    
    fs.appendFileSync('reports.log', reportLog);
    console.log(`⚠️ THREAT_DETECTION: App ${id} has been reported.`);
    
    res.status(200).send("Report received.");
});
const PORT = process.env.PORT || 10000; // Render prefers 10000
http.listen(PORT, () => console.log(`System Online on Port ${PORT}`));