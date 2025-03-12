const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhzSFpVV1A2Ylk3bjArZTVYeVU0dDlTKzNuSndyajc0bzQ3Yjh5OFBtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVGVZK2NWT0drb2pLcUdySzhzSlUrVlFwaGxxamwybXNuTWtNWnU3RVBDbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTDF0ak9Jb3c3Wkl1bmZiaWVPUU92RVFlNkduSHRIazZpMy9OL1ViNTI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHdUgzNUJkb00rM05pZXM1dWppVGlWbHBCZkNVaVhua0d3Z3RKYlQwL0NVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNDdGNDVnNyL0JyL0U2OENpTjJhZmdJRExtZUo3bU52bjRVUnN5VHRkbVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImsxSjYzdGhGQ0NtVUNIUG5CSExiRHVMNW1NdGpFQ3IyNjRVOGZqVFFCSHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0wrZnVrc2pVaVl0NW9ldVVNSi8wb2ErNy9Lc1FLRkJGeU85MnV4bUpGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTdMNk1jUEhocmwzSExJT2RqcC9ubHgybHJ2YnBTbVMrKzkxNjVvZXZrMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYzbEkyYkFidDN4cXZtNWxNNFQwQlZIRWgyZlBrMHFDRDNrUDN1UjlQNTFuSHhJMzFuWXZtTWg4ai8ya29LQlpRdkg2QWdJcm5ZczZqRExpTnVyZEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJ0NkN1ZjZubDZlNUlXaHllOWkxelduaVp2UndXb2RPNmJUM1VQaDVyNVVjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJGSEc2V0tONSIsIm1lIjp7ImlkIjoiMTg3NjIzMDMzMTQ6MTRAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMTkwNTI1NDI4MDgyNjg6MTRAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNanA2cjRERU9ueXhyNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJQZTk1b3ZUWElkM09hNW55ZzZEY0c4YU9ZUnlqNE1IRGJWT0JBeG5BMlNBPSIsImFjY291bnRTaWduYXR1cmUiOiJHMDZkQjFETkZnSHlGa3JCN2RraEk0ZnNYWEdkT1BlazdXcWFNMncvcGN2aG1VL0Y1OWZTK0dJdndxajlsVWMxejd2VEpKd0tBL3ZkUFF1MWI1aHhDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoia0VUb3JhRm9tcXQ2OTNubzYzRTFBZHNPZjU5MmFxL25XSXg4aUZscWVxVmIrTVRYMXRLNEpuaUxqbHNtUGNWL0lsajEzVnhGWE93K2N2ejIwWDRJQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxODc2MjMwMzMxNDoxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUM3ZlYUwwMXlIZHptdVo4b09nM0J2R2ptRWNvK0RCdzIxVGdRTVp3TmtnIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE3OTc3NTAsImxhc3RQcm9wSGFzaCI6IjNSOVozOSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUGFlIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
